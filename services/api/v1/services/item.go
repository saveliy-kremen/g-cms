package services

import (
	"context"
	"fmt"
	//"github.com/davecgh/go-spew/spew"
	"os"
	"strconv"
	"strings"

	"github.com/golang/protobuf/ptypes/empty"
	"github.com/jinzhu/gorm"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	v1 "../../../api/v1"
	"../../../config"
	"../../../db"
	"../../../models"
	"../../../packages/auth"
	"../../../packages/utils"
)

type ItemServiceImpl struct {
}

func (u *ItemServiceImpl) Item(ctx context.Context, req *v1.ItemRequest) (*v1.ItemResponse, error) {
	user_id := auth.GetUserUID(ctx)

	item := models.Item{}
	if db.DB.Preload("Images", func(db *gorm.DB) *gorm.DB {
		return db.Order(config.AppConfig.Prefix + "_item_images.sort ASC")
	}).Where("user_id = ?", user_id).First(&item, req.Id).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Item not found")
	}
	return &v1.ItemResponse{Item: models.ItemToResponse(item)}, nil
}

func (u *ItemServiceImpl) Items(ctx context.Context, req *v1.ItemsRequest) (*v1.ItemsResponse, error) {
	user_id := auth.GetUserUID(ctx)

	items := []models.Item{}
	var total uint32
	order := "sort"
	if req.Sort != "" {
		order = req.Sort + " " + req.Direction
	}
	db.DB.Where("user_id = ? AND draft <> ?", user_id, true).Order("sort").Find(&items).Count(&total)
	db.DB.Preload("Images", func(db *gorm.DB) *gorm.DB {
		return db.Order(config.AppConfig.Prefix + "_item_images.sort ASC")
	}).Where("user_id = ? AND draft <> ?", user_id, true).Order(order).Offset(req.Page * req.PageSize).Limit(req.PageSize).Find(&items)
	return &v1.ItemsResponse{Items: models.ItemsToResponse(items), Total: total}, nil
}

func (u *ItemServiceImpl) CreateDraftItem(ctx context.Context, req *v1.DraftRequest) (*v1.ItemResponse, error) {
	user_id := auth.GetUserUID(ctx)

	draft := models.Item{}
	if db.DB.Where("user_id = ? AND draft = ?", user_id, true).First(&draft).RecordNotFound() {
		draft.UserID = user_id
		draft.Draft = true
		db.DB.Create(&draft)
	}
	db.DB.Where("user_id = ? AND draft = ? AND id <> ?", user_id, true, draft.ID).Delete(models.Item{})
	if req.ParentId == 0 {
		//Item
		draft.ParentID = 0
		draft.Title = ""
		draft.Alias = ""
		draft.Article = ""
	} else {
		//Offer
		parent := models.Item{}
		if db.DB.Where("user_id = ?", user_id).First(&parent, req.ParentId).RecordNotFound() {
			return nil, status.Errorf(codes.NotFound, "Parent item not found")
		}
		draft.ParentID = req.ParentId
		draft.Title = parent.Title
		draft.Alias = parent.Alias
		draft.Article = parent.Article
	}
	db.DB.Save(&draft)
	return &v1.ItemResponse{Item: models.ItemToResponse(draft)}, nil
}

func (u *ItemServiceImpl) EditItem(ctx context.Context, req *v1.EditItemRequest) (*v1.ItemResponse, error) {
	user_id := auth.GetUserUID(ctx)

	item := models.Item{}
	if req.Id != 0 {
		if db.DB.Where("user_id = ?", user_id).First(&item, req.Id).RecordNotFound() {
			return nil, status.Errorf(codes.NotFound, "Item not found")
		}
	}

	item.UserID = user_id
	item.Title = req.Title
	item.Article = req.Article
	if item.Article == "" {
		item.Article = utils.Translit(strings.ToLower(item.Title))
	}
	item.Alias = req.Alias
	item.Count = req.Count
	item.Description = req.Description
	item.Price = req.Price
	item.OldPrice = req.OldPrice
	item.CurrencyID = req.CurrencyId
	item.Disable = req.Disable
	item.Sort = req.Sort
	item.Draft = false
	if db.DB.Save(&item).Error != nil {
		return nil, status.Errorf(codes.Aborted, "Error create item")
	}

	//Properties
	oldItemProperties := []models.ItemProperty{}
	db.DB.Where("user_id = ? AND item_id = ?", user_id, item.ID).Find(&oldItemProperties)
	for _, oldItemProperty := range oldItemProperties {
		db.DB.Unscoped().Delete(&oldItemProperty)
	}
	for _, propertyValue := range req.Properties {
		property := models.Property{}
		if !db.DB.Where("code = ?", propertyValue.Code).First(&property).RecordNotFound() {
			for _, valueID := range propertyValue.PropertyValueIds {
				itemProperty := models.ItemProperty{}
				itemProperty.UserID = user_id
				itemProperty.ItemID = uint32(item.ID)
				itemProperty.PropertyID = uint32(property.ID)
				itemProperty.PropertyValueID = valueID
				db.DB.Create(&itemProperty)
			}
		}
	}

	//Images
	directory := config.AppConfig.UploadPath + "/users/" + strconv.Itoa(int(user_id)) + "/images/"
	itemImages := []models.ItemImage{}
	orderValues := strings.Replace(strings.Trim(fmt.Sprint(req.ItemImages), "[]"), " ", ",", -1)
	db.DB.Where("user_id = ? AND id IN(?)", user_id, req.ItemImages).Order(gorm.Expr(fmt.Sprintf("FIELD(id, %s)", orderValues))).Find(&itemImages)
	for i, itemImage := range itemImages {
		if uint(itemImage.ItemID) != item.ID {
			itemImage.ItemID = uint32(item.ID)
			os.Rename(directory+"0/"+itemImage.Filename, directory+strconv.Itoa(int(item.ID))+"/"+itemImage.Filename)
		}
		itemImage.Sort = uint32(i * 10)
		db.DB.Save(&itemImage)
	}
	uploadImages := []models.ItemImage{}
	orderValues = strings.Replace(strings.Trim(fmt.Sprint(req.UploadImages), "[]"), " ", ",", -1)
	db.DB.Where("user_id = ? AND id IN(?)", user_id, req.UploadImages).Order(gorm.Expr(fmt.Sprintf("FIELD(id, %s)", orderValues))).Find(&uploadImages)
	for i, uploadImage := range uploadImages {
		if uploadImage.ItemID != 0 {
			uploadImage.ItemID = 0
			os.Rename(directory+strconv.Itoa(int(item.ID))+"/"+uploadImage.Filename, directory+"0/"+uploadImage.Filename)
		}
		uploadImage.Sort = uint32(i * 10)
		db.DB.Save(&uploadImage)
	}
	deleteImages := []models.ItemImage{}
	db.DB.Where("user_id = ? AND id NOT IN(?) AND id NOT IN(?)", user_id, req.ItemImages, req.UploadImages).Find(&deleteImages)
	for _, deleteImage := range deleteImages {
		if deleteImage.ItemID == 0 {
			os.Remove(directory + "0/" + deleteImage.Filename)
		} else {
			os.Remove(directory + strconv.Itoa(int(item.ID)) + "/" + deleteImage.Filename)
		}
		db.DB.Delete(&deleteImage)
	}
	return &v1.ItemResponse{Item: models.ItemToResponse(item)}, nil
}

func (u *ItemServiceImpl) DeleteItem(ctx context.Context, req *v1.DeleteItemRequest) (*v1.ItemsResponse, error) {
	user_id := auth.GetUserUID(ctx)

	if db.DB.Unscoped().Where("user_id=? AND id = ?", user_id, req.Id).Delete(&models.Item{}).Error != nil {
		return nil, status.Errorf(codes.Aborted, "Error delete item")
	} else {
		/*
			propertyValues := []models.PropertyValue{}
			db.DB.Where("user_id = ? AND property_id = ?", user_id, req.Id).Find(&propertyValues)
			for _, propertyValue := range propertyValues {
				db.DB.Unscoped().Delete(&propertyValue)
			}
			directory := config.AppConfig.UploadPath + "/properties/" + strconv.Itoa(int(req.Id))
			os.RemoveAll(directory)
		*/
	}
	return u.Items(ctx, &v1.ItemsRequest{Page: req.Page, PageSize: req.PageSize, Sort: req.Sort, Direction: req.Direction})
}

func (u *ItemServiceImpl) GetUploadImages(ctx context.Context, req *empty.Empty) (*v1.ItemImagesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	images := []models.ItemImage{}
	db.DB.Where("user_id = ? AND item_id = ?", user_id, 0).Order("sort").Find(&images)
	return &v1.ItemImagesResponse{Images: models.ItemImagesToResponse(images)}, nil
}

func (u *ItemServiceImpl) ItemCategories(ctx context.Context, req *v1.ItemRequest) (*v1.CategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	item := models.Item{}
	if req.Id != 0 {
		if db.DB.Where("user_id = ?", user_id).First(&item, req.Id).RecordNotFound() {
			return nil, status.Errorf(codes.NotFound, "Item not found")
		}
	}

	categories := []models.Category{}
	db.DB.Model(&item).Related(&categories, "Categories")
	var cat []uint
	for _, category := range categories {
		cat = append(cat, category.ID)
	}
	categories = []models.Category{}
	db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)

	for i, category := range categories {
		if utils.HasElement(cat, category.ID) {
			categories[i].Selected = true
		} else {
			categories[i].Selected = false
		}

		if category.Parent == "#" {
			categories[i].Opened = true
		} else {
			categories[i].Opened = false
		}
	}
	return &v1.CategoriesResponse{Categories: models.CategoriesToResponse(categories)}, nil
}

func (u *ItemServiceImpl) ItemBindCategory(ctx context.Context, req *v1.ItemBindRequest) (*v1.CategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	item := models.Item{}
	if db.DB.Where("user_id = ?", user_id).First(&item, req.Id).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Item not found")
	}

	category := models.Category{}
	if db.DB.Where("user_id = ?", user_id).First(&category, req.CategoryId).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Category_not_found")
	}

	itemCategory := models.ItemsCategories{}
	if db.DB.Where("user_id = ? AND item_id = ? AND category_id = ?", user_id, req.Id, req.CategoryId).First(&itemCategory).RecordNotFound() {
		itemCategory.UserID = user_id
		itemCategory.ItemID = uint(req.Id)
		itemCategory.CategoryID = category.ID
		if db.DB.Save(&itemCategory).Error != nil {
			return nil, status.Errorf(codes.Aborted, "Error bind category")
		}
	}

	categories := []models.Category{}
	db.DB.Model(&item).Related(&categories, "Categories")
	var cat []uint
	for _, category := range categories {
		cat = append(cat, category.ID)
	}
	categories = []models.Category{}
	db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)

	for i, category := range categories {
		if utils.HasElement(cat, category.ID) {
			categories[i].Selected = true
		} else {
			categories[i].Selected = false
		}

		if category.Parent == "#" {
			categories[i].Opened = true
		} else {
			categories[i].Opened = false
		}
	}
	return &v1.CategoriesResponse{Categories: models.CategoriesToResponse(categories)}, nil
}

func (u *ItemServiceImpl) ItemUnbindCategory(ctx context.Context, req *v1.ItemBindRequest) (*v1.CategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	item := models.Item{}
	if db.DB.Where("user_id = ?", user_id).First(&item, req.Id).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Item not found")
	}

	category := models.Category{}
	if db.DB.Where("user_id = ?", user_id).First(&category, req.CategoryId).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Category_not_found")
	}

	itemCategory := models.ItemsCategories{}
	if db.DB.Unscoped().Where("user_id = ? AND item_id = ? AND category_id = ?", user_id, req.Id, req.CategoryId).Delete(&itemCategory).Error != nil {
		return nil, status.Errorf(codes.Aborted, "Error unbind category")
	}

	categories := []models.Category{}
	db.DB.Model(&item).Related(&categories, "Categories")
	var cat []uint
	for _, category := range categories {
		cat = append(cat, category.ID)
	}
	categories = []models.Category{}
	db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)

	for i, category := range categories {
		if utils.HasElement(cat, category.ID) {
			categories[i].Selected = true
		} else {
			categories[i].Selected = false
		}

		if category.Parent == "#" {
			categories[i].Opened = true
		} else {
			categories[i].Opened = false
		}
	}
	return &v1.CategoriesResponse{Categories: models.CategoriesToResponse(categories)}, nil
}

func (u *ItemServiceImpl) ItemProperties(ctx context.Context, req *v1.ItemRequest) (*v1.PropertiesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	item := models.Item{}
	if req.Id != 0 {
		if db.DB.Where("user_id = ?", user_id).First(&item, req.Id).RecordNotFound() {
			return nil, status.Errorf(codes.NotFound, "Item not found")
		}
	}

	itemCategories := []models.ItemsCategories{}
	if item.ParentID == 0 {
		db.DB.Where("user_id = ? AND item_id = ?", user_id, item.ID).Find(&itemCategories)
	} else {
		db.DB.Where("user_id = ? AND item_id = ?", user_id, item.ParentID).Find(&itemCategories)
	}
	var cats []uint
	for _, itemCategory := range itemCategories {
		cats = append(cats, itemCategory.CategoryID)
		childCategoriesIDs := childCategoriesIDs(user_id, itemCategory.CategoryID)
		cats = append(cats, childCategoriesIDs...)
	}

	propertiesCategories := []models.PropertiesCategories{}
	db.DB.Where("user_id = ? AND category_id IN (?)", user_id, cats).Find(&propertiesCategories)
	var props []uint
	for _, propertiesCategory := range propertiesCategories {
		props = append(props, propertiesCategory.PropertyID)
	}
	properties := []models.Property{}
	db.DB.Preload("Values").Where("user_id = ? AND id IN(?)", user_id, props).Order("sort").Find(&properties)
	for propertyIndex, property := range properties {
		item_values_ids := []uint32{}
		item_property_values := []models.ItemProperty{}
		db.DB.Where("user_id = ? AND item_id = ? AND property_id = ?", user_id, req.Id, property.ID).Find(&item_property_values)
		for _, item_property_value := range item_property_values {
			item_values_ids = append(item_values_ids, item_property_value.PropertyValueID)
		}
		properties[propertyIndex].ItemValues = item_values_ids
	}
	return &v1.PropertiesResponse{Properties: models.PropertiesToResponse(properties)}, nil
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.ItemServiceServer = (*ItemServiceImpl)(nil)
