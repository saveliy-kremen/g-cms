package services

import (
	"context"
	"fmt"
	"io"
	"net/http"

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
	"../../../packages/thumbs"
	"../../../packages/utils"
)

type AdminItemServiceImpl struct {
}

func (s *AdminItemServiceImpl) AdminItem(ctx context.Context, req *v1.AdminItemRequest) (*v1.AdminItemResponse, error) {
	user_id := auth.GetUserUID(ctx)

	item := models.Item{}
	if db.DB.Preload("Vendor").Preload("Currency").Preload("Images", func(db *gorm.DB) *gorm.DB {
		return db.Order(config.AppConfig.Prefix + "_item_images.sort ASC")
	}).Where("user_id = ?", user_id).First(&item, req.Id).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Item not found")
	}
	item.Properties = itemProperties(&item)
	item.Offers = itemOffers(&item, nil, nil, nil, nil)

	return &v1.AdminItemResponse{Item: models.AdminItemToResponse(item)}, nil
}

func (s *AdminItemServiceImpl) AdminItems(ctx context.Context, req *v1.AdminItemsRequest) (*v1.AdminItemsResponse, error) {
	user_id := auth.GetUserUID(ctx)

	items := []models.Item{}
	var total uint32
	order := "sort"
	if req.Sort != "" {
		order = req.Sort + " " + req.Direction
	}
	db.DB.Where("user_id = ? AND draft <> ? AND parent_id = ?", user_id, true, 0).Find(&items).Count(&total)
	db.DB.Preload("Vendor").Preload("Currency").Preload("Images", func(db *gorm.DB) *gorm.DB {
		return db.Order(config.AppConfig.Prefix + "_item_images.sort ASC")
	}).Where("user_id = ? AND draft <> ? AND parent_id = ?", user_id, true, 0).Order(order).Offset(req.Page * req.PageSize).Limit(req.PageSize).Find(&items)
	for i, item := range items {
		db.DB.Preload("Vendor").Preload("Currency").Preload("Images", func(db *gorm.DB) *gorm.DB {
			return db.Order(config.AppConfig.Prefix + "_item_images.sort ASC")
		}).Where("user_id = ? AND parent_id = ?", user_id, item.ID).Order(order).Find(&items[i].Offers)
	}
	return &v1.AdminItemsResponse{Items: models.AdminItemsToResponse(items), Total: total}, nil
}

func (s *AdminItemServiceImpl) AdminCreateDraftItem(ctx context.Context, req *v1.AdminDraftRequest) (*v1.AdminItemResponse, error) {
	user_id := auth.GetUserUID(ctx)

	draft := models.Item{}
	if db.DB.Where("user_id = ? AND draft = ?", user_id, true).First(&draft).RecordNotFound() {
		draft.UserID = user_id
		draft.Draft = true
		db.DB.Create(&draft)
	}
	db.DB.Unscoped().Where("user_id = ? AND draft = ? AND id <> ?", user_id, true, draft.ID).Delete(models.Item{})
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
	return &v1.AdminItemResponse{Item: models.AdminItemToResponse(draft)}, nil
}

func (s *AdminItemServiceImpl) AdminEditItem(ctx context.Context, req *v1.AdminEditItemRequest) (*v1.AdminItemResponse, error) {
	user_id := auth.GetUserUID(ctx)

	item := models.Item{}
	if req.Id != 0 {
		if db.DB.Where("user_id = ?", user_id).First(&item, req.Id).RecordNotFound() {
			return nil, status.Errorf(codes.NotFound, "Item not found")
		}
	}

	item.UserID = user_id
	item.Title = req.Title
	item.ParentID = req.ParentId
	item.Article = req.Article
	item.Alias = req.Alias
	if item.Alias == "" {
		item.Alias = utils.Translit(strings.ToLower(item.Title))
	}
	item.Count = req.Count
	item.InStock = req.InStock
	item.Description = req.Description
	item.VendorID = req.VendorId
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
	directory := config.AppConfig.UploadPath + "/users/" + strconv.Itoa(int(user_id)) + "/items/"
	if _, err := os.Stat(directory + strconv.Itoa(int(item.ID))); err != nil {
		os.MkdirAll(directory+strconv.Itoa(int(item.ID)), 0775)
	}

	if req.ItemImages != nil {
		itemImages := []models.ItemImage{}
		orderValues := strings.Replace(strings.Trim(fmt.Sprint(req.ItemImages), "[]"), " ", ",", -1)
		db.DB.Where("user_id = ? AND id IN(?)", user_id, req.ItemImages).Order(gorm.Expr(fmt.Sprintf("FIELD(id, %s)", orderValues))).Find(&itemImages)
		for i, itemImage := range itemImages {
			if uint(itemImage.ItemID) != item.ID {
				itemImage.ItemID = uint32(item.ID)
				os.Rename(directory+"0/"+itemImage.Filename, directory+strconv.Itoa(int(item.ID))+"/"+itemImage.Filename)
				thumbs.CreateThumbs(directory+strconv.Itoa(int(item.ID)), itemImage.Filename, config.AppConfig.Thumbs.Catalog)
			}
			itemImage.Sort = uint32(i * 10)
			db.DB.Save(&itemImage)
		}
	}
	if req.UploadImages != nil {
		uploadImages := []models.ItemImage{}
		orderValues := strings.Replace(strings.Trim(fmt.Sprint(req.UploadImages), "[]"), " ", ",", -1)
		db.DB.Where("user_id = ? AND id IN(?)", user_id, req.UploadImages).Order(gorm.Expr(fmt.Sprintf("FIELD(id, %s)", orderValues))).Find(&uploadImages)
		for i, uploadImage := range uploadImages {
			if uploadImage.ItemID != 0 {
				uploadImage.ItemID = 0
				os.Rename(directory+strconv.Itoa(int(item.ID))+"/"+uploadImage.Filename, directory+"0/"+uploadImage.Filename)
				thumbs.DeleteThumbs(directory+strconv.Itoa(int(item.ID)), uploadImage.Filename, config.AppConfig.Thumbs.Catalog)
			}
			uploadImage.Sort = uint32(i * 10)
			db.DB.Save(&uploadImage)
		}
	}
	deleteImages := []models.ItemImage{}
	existImagesIDs := []uint32{}
	existImagesIDs = append(existImagesIDs, req.ItemImages...)
	existImagesIDs = append(existImagesIDs, req.UploadImages...)
	if len(existImagesIDs) > 0 {
		db.DB.Where("user_id = ? AND (item_id = ? OR item_id = ?) AND id NOT IN(?)", user_id, 0, item.ID, existImagesIDs).Find(&deleteImages)
	} else {
		db.DB.Where("user_id = ? AND (item_id = ? OR item_id = ?)", user_id, 0, item.ID).Find(&deleteImages)
	}
	for _, deleteImage := range deleteImages {
		if deleteImage.ItemID == 0 {
			os.Remove(directory + "0/" + deleteImage.Filename)
		} else {
			os.Remove(directory + strconv.Itoa(int(item.ID)) + "/" + deleteImage.Filename)
			thumbs.DeleteThumbs(directory+strconv.Itoa(int(item.ID)), deleteImage.Filename, config.AppConfig.Thumbs.Catalog)
		}
		db.DB.Unscoped().Delete(&deleteImage)
	}
	return &v1.AdminItemResponse{Item: models.AdminItemToResponse(item)}, nil
}

func (s *AdminItemServiceImpl) AdminDeleteItem(ctx context.Context, req *v1.AdminDeleteItemRequest) (*v1.AdminItemsResponse, error) {
	user_id := auth.GetUserUID(ctx)

	err := deleteItem(user_id, req.Id)
	if err != nil {
		return nil, status.Errorf(codes.Aborted, "Error delete item")
	}
	return s.AdminItems(ctx, &v1.AdminItemsRequest{Page: req.Page, PageSize: req.PageSize, Sort: req.Sort, Direction: req.Direction})
}

func (s *AdminItemServiceImpl) AdminDeleteOffer(ctx context.Context, req *v1.AdminDeleteOfferRequest) (*v1.AdminOffersResponse, error) {
	user_id := auth.GetUserUID(ctx)

	err := deleteItem(user_id, req.Id)
	if err != nil {
		return nil, status.Errorf(codes.Aborted, "Error delete offer")
	}
	return s.AdminItemOffers(ctx, &v1.AdminOffersRequest{ItemId: req.ParentId, Page: req.Page, PageSize: req.PageSize, Sort: req.Sort, Direction: req.Direction})
}

func (s *AdminItemServiceImpl) AdminGetUploadImages(ctx context.Context, req *empty.Empty) (*v1.AdminItemImagesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	images := []models.ItemImage{}
	db.DB.Where("user_id = ? AND item_id = ?", user_id, 0).Order("sort").Find(&images)
	return &v1.AdminItemImagesResponse{Images: models.AdminItemImagesToResponse(images)}, nil
}

func (s *AdminItemServiceImpl) AdminItemCategories(ctx context.Context, req *v1.AdminItemRequest) (*v1.AdminCategoriesResponse, error) {
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
	return &v1.AdminCategoriesResponse{Categories: models.AdminCategoriesToResponse(categories)}, nil
}

func (s *AdminItemServiceImpl) AdminItemBindCategory(ctx context.Context, req *v1.AdminItemBindRequest) (*v1.AdminCategoriesResponse, error) {
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
	return &v1.AdminCategoriesResponse{Categories: models.AdminCategoriesToResponse(categories)}, nil
}

func (s *AdminItemServiceImpl) AdminItemUnbindCategory(ctx context.Context, req *v1.AdminItemBindRequest) (*v1.AdminCategoriesResponse, error) {
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
	return &v1.AdminCategoriesResponse{Categories: models.AdminCategoriesToResponse(categories)}, nil
}

func (s *AdminItemServiceImpl) AdminItemProperties(ctx context.Context, req *v1.AdminItemRequest) (*v1.AdminPropertiesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	item := models.Item{}
	if req.Id != 0 {
		if db.DB.Where("user_id = ?", user_id).First(&item, req.Id).RecordNotFound() {
			return nil, status.Errorf(codes.NotFound, "Item not found")
		}
	}
	properties := itemProperties(&item)
	return &v1.AdminPropertiesResponse{Properties: models.AdminPropertiesToResponse(properties)}, nil
}

func (s *AdminItemServiceImpl) AdminItemOffers(ctx context.Context, req *v1.AdminOffersRequest) (*v1.AdminOffersResponse, error) {
	user_id := auth.GetUserUID(ctx)

	item := models.Item{}
	if req.ItemId != 0 {
		if db.DB.Where("user_id = ?", user_id).First(&item, req.ItemId).RecordNotFound() {
			return nil, status.Errorf(codes.NotFound, "Item not found")
		}
	}

	offers := []models.Item{}
	var total uint32
	db.DB.Where("user_id = ? AND parent_id = ? AND draft <> ? ", user_id, item.ID, false).Find(&offers).Count(&total)
	offers = itemOffers(&item, &req.Page, &req.PageSize, &req.Sort, &req.Direction)
	return &v1.AdminOffersResponse{Offers: models.AdminItemsToResponse(offers), Total: total}, nil
}

func (s *AdminItemServiceImpl) AdminUploadOffer(ctx context.Context, req *v1.AdminUploadOfferRequest) (*v1.AdminItemResponse, error) {
	user_id := auth.GetUserUID(ctx)

	vendor := models.Vendor{}
	if db.DB.Where("name = ?", req.Vendor).First(&vendor).RecordNotFound() {
		vendor.Name = req.Vendor
		vendor.Country = req.Country
		db.DB.Create(&vendor)
	}

	item := models.Item{}
	alias := utils.Translit(strings.ToLower(req.Title))
	db.DB.Where("user_id = ? AND alias = ? AND parent_id = ? AND vendor_id = ?", user_id, alias, req.ParentId, vendor.ID).First(&item)
	if item.Sort == 0 {
		lastItem := models.Item{}
		db.DB.Where("user_id = ? AND parent_id = ?", user_id, req.ParentId).Order("sort DESC").First(&lastItem)
		item.Sort = lastItem.Sort + 10
	}
	item.UserID = user_id
	item.Title = req.Title
	item.Alias = alias
	item.Article = req.Article
	item.ParentID = req.ParentId
	item.Price = req.Price
	item.Count = req.Count
	item.InStock = req.InStock
	item.Description = req.Description

	currency := models.Currency{}
	if db.DB.Where("code = ?", req.Currency).First(&currency).RecordNotFound() {
		currency.Code = req.Currency
		currency.Name = req.Currency
		currency.ShortName = req.Currency
		db.DB.Create(&currency)
	}
	item.CurrencyID = uint32(currency.ID)
	item.VendorID = uint32(vendor.ID)
	if db.DB.Save(&item).Error != nil {
		return nil, status.Errorf(codes.Aborted, "Error save offer")
	}

	if req.CategoryId != 0 {
		category := models.Category{}
		if !db.DB.Where("user_id = ?", user_id).First(&category, req.CategoryId).RecordNotFound() {
			itemCategory := models.ItemsCategories{}
			if db.DB.Where("user_id = ? AND item_id = ? AND category_id = ?", user_id, item.ID, category.ID).First(&itemCategory).RecordNotFound() {
				itemCategory.UserID = user_id
				itemCategory.ItemID = item.ID
				itemCategory.CategoryID = category.ID
				db.DB.Save(&itemCategory)
			}
		}
	}

	//Images
	directory := config.AppConfig.UploadPath + "/users/" + strconv.Itoa(int(user_id)) + "/items/" + strconv.Itoa(int(item.ID)) + "/"
	os.RemoveAll(directory)
	os.MkdirAll(directory, 0775)
	itemImages := []models.ItemImage{}
	db.DB.Where("user_id = ? AND item_id = ?", user_id, item.ID).Find(&itemImages)
	for _, itemImage := range itemImages {
		db.DB.Unscoped().Delete(&itemImage)
	}
	for i, image := range req.Images {
		resp, err := http.Get(image)
		if err == nil {
			defer resp.Body.Close()
			filepath := strings.Split(image, "/")
			filename := filepath[len(filepath)-1]
			file, err := os.Create(directory + filename)
			if err == nil {
				defer file.Close()
				_, err = io.Copy(file, resp.Body)
				if err == nil {
					itemImage := models.ItemImage{}
					itemImage.UserID = user_id
					itemImage.ItemID = uint32(item.ID)
					itemImage.Filename = filename
					itemImage.Sort = uint32(i * 10)
					db.DB.Create(&itemImage)
					thumb, err := thumbs.CreateThumb(directory+filename, config.AppConfig.Thumbs.Item, directory, strconv.Itoa(int(itemImage.ID)))
					if err == nil {
						itemImage.Filename = *thumb
						db.DB.Save(&itemImage)
						if filename != *thumb {
							os.Remove(directory + filename)
						}
						thumbs.CreateThumbs(directory, itemImage.Filename, config.AppConfig.Thumbs.Catalog)
					}
				}
			}
		}
	}
	return &v1.AdminItemResponse{Item: models.AdminItemToResponse(item)}, nil
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.AdminItemServiceServer = (*AdminItemServiceImpl)(nil)
