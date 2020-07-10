package services

import (
	"context"

	//"github.com/golang/protobuf/ptypes/empty"
	"os"
	"strconv"
	"strings"

	v1 "gcms/api/v1"
	"gcms/config"
	"gcms/models"
	"gcms/packages/auth"
	"gcms/packages/upload"
	"gcms/packages/utils"
)

type AdminPropertyServiceImpl struct {
}

func (s *AdminPropertyServiceImpl) AdminProperty(ctx context.Context, req *v1.AdminPropertyRequest) (*v1.AdminPropertyResponse, error) {
	//user_id := auth.GetUserUID(ctx)

	property := models.Property{}
	// if db.DB.Preload("Values").Where("user_id = ?", user_id).First(&property, req.Id).RecordNotFound() {
	// 	return nil, status.Errorf(codes.NotFound, "Property not found")
	// }
	return &v1.AdminPropertyResponse{Property: models.AdminPropertyToResponse(property)}, nil
}

func (s *AdminPropertyServiceImpl) AdminProperties(ctx context.Context, req *v1.AdminPropertiesRequest) (*v1.AdminPropertiesResponse, error) {
	//user_id := auth.GetUserUID(ctx)

	properties := []models.Property{}
	var total uint32
	// order := "sort"
	// if req.Sort != "" {
	// 	order = req.Sort + " " + req.Direction
	// }
	//db.DB.Where("user_id = ?", user_id).Order("sort").Find(&properties).Count(&total)
	//db.DB.Where("user_id = ?", user_id).Order(order).Offset(req.Page * req.PageSize).Limit(req.PageSize).Find(&properties)
	return &v1.AdminPropertiesResponse{Properties: models.AdminPropertiesToResponse(properties), Position: (req.Page * req.PageSize) + 1, Total: total}, nil
}

func (s *AdminPropertyServiceImpl) AdminEditProperty(ctx context.Context, req *v1.AdminEditPropertyRequest) (*v1.AdminPropertyResponse, error) {
	user_id := auth.GetUserUID(ctx)

	property := models.Property{}
	if req.Id != 0 {
		// if db.DB.Where("user_id = ?", user_id).First(&property, req.Id).RecordNotFound() {
		// 	return nil, status.Errorf(codes.NotFound, "Property not found")
		// }
	}

	property.UserID = user_id
	property.Title = req.Title
	property.Code = req.Code
	if property.Code == "" {
		property.Code = utils.Translit(strings.ToLower(property.Title))
	}
	//existProperty := models.Property{}
	// if !db.DB.Where("user_id = ? AND code = ? AND id <> ?", user_id, property.Code, req.Id).First(&existProperty).RecordNotFound() {
	// 	return nil, status.Errorf(codes.Aborted, "Property code exist")
	// }
	property.Type = models.PropertyType(req.Type)
	property.Display = models.PropertyDisplayType(req.Display)
	property.Required = req.Required
	property.Multiple = req.Multiple
	property.Sort = uint(req.Sort)
	// if db.DB.Save(&property).Error != nil {
	// 	return nil, status.Errorf(codes.Aborted, "Error create property")
	// }
	return &v1.AdminPropertyResponse{Property: models.AdminPropertyToResponse(property)}, nil
}

func (s *AdminPropertyServiceImpl) AdminDeleteProperty(ctx context.Context, req *v1.AdminDeletePropertyRequest) (*v1.AdminPropertiesResponse, error) {
	//user_id := auth.GetUserUID(ctx)

	// if db.DB.Unscoped().Where("user_id=? AND id = ?", user_id, req.Id).Delete(&models.Property{}).Error != nil {
	// 	return nil, status.Errorf(codes.Aborted, "Error delete property")
	// } else {
	// 	propertyValues := []models.PropertyValue{}
	// 	db.DB.Where("user_id = ? AND property_id = ?", user_id, req.Id).Find(&propertyValues)
	// 	for _, propertyValue := range propertyValues {
	// 		db.DB.Unscoped().Delete(&propertyValue)
	// 	}
	// 	directory := config.AppConfig.UploadPath + "/properties/" + strconv.Itoa(int(req.Id))
	// 	os.RemoveAll(directory)
	// }
	return s.AdminProperties(ctx, &v1.AdminPropertiesRequest{Page: req.Page, PageSize: req.PageSize, Sort: req.Sort, Direction: req.Direction})
}

func (s *AdminPropertyServiceImpl) AdminPropertyCategories(ctx context.Context, req *v1.AdminPropertyRequest) (*v1.AdminCategoriesResponse, error) {
	//user_id := auth.GetUserUID(ctx)

	//property := models.Property{}
	if req.Id != 0 {
		// if db.DB.Where("user_id = ?", user_id).First(&property, req.Id).RecordNotFound() {
		// 	return nil, status.Errorf(codes.NotFound, "Property not found")
		// }
	}

	categories := []models.Category{}
	//db.DB.Model(&property).Related(&categories, "Categories")
	var cat []uint32
	for _, category := range categories {
		cat = append(cat, category.ID)
	}
	categories = []models.Category{}
	//db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)

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

func (s *AdminPropertyServiceImpl) AdminPropertyBindCategory(ctx context.Context, req *v1.AdminPropertyBindRequest) (*v1.AdminCategoriesResponse, error) {
	//user_id := auth.GetUserUID(ctx)

	//property := models.Property{}
	// if db.DB.Where("user_id = ?", user_id).First(&property, req.Id).RecordNotFound() {
	// 	return nil, status.Errorf(codes.NotFound, "Property not found")
	// }

	//category := models.Category{}
	// if db.DB.Where("user_id = ?", user_id).First(&category, req.CategoryId).RecordNotFound() {
	// 	return nil, status.Errorf(codes.NotFound, "Category_not_found")
	// }

	//item := models.PropertiesCategories{}
	// if db.DB.Where("user_id = ? AND property_id = ? AND category_id = ?", user_id, req.Id, req.CategoryId).First(&item).RecordNotFound() {
	// 	item.UserID = user_id
	// 	item.PropertyID = uint(req.Id)
	// 	item.CategoryID = category.ID
	// 	if db.DB.Save(&item).Error != nil {
	// 		return nil, status.Errorf(codes.Aborted, "Error bind category")
	// 	}
	// }

	categories := []models.Category{}
	//db.DB.Model(&property).Related(&categories, "Categories")
	var cat []uint32
	for _, category := range categories {
		cat = append(cat, category.ID)
	}
	categories = []models.Category{}
	//db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)

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

func (s *AdminPropertyServiceImpl) AdminPropertyUnbindCategory(ctx context.Context, req *v1.AdminPropertyBindRequest) (*v1.AdminCategoriesResponse, error) {
	//user_id := auth.GetUserUID(ctx)

	//property := models.Property{}
	// if db.DB.Where("user_id = ?", user_id).First(&property, req.Id).RecordNotFound() {
	// 	return nil, status.Errorf(codes.NotFound, "Property not found")
	// }

	//category := models.Category{}
	// if db.DB.Where("user_id = ?", user_id).First(&category, req.CategoryId).RecordNotFound() {
	// 	return nil, status.Errorf(codes.NotFound, "Category_not_found")
	// }

	//item := models.PropertiesCategories{}
	// if db.DB.Unscoped().Where("user_id = ? AND property_id = ? AND category_id = ?", user_id, req.Id, req.CategoryId).Delete(&item).Error != nil {
	// 	return nil, status.Errorf(codes.Aborted, "Error unbind category")
	// }

	categories := []models.Category{}
	//db.DB.Model(&property).Related(&categories, "Categories")
	var cat []uint32
	for _, category := range categories {
		cat = append(cat, category.ID)
	}
	categories = []models.Category{}
	//db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)

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

func (s *AdminPropertyServiceImpl) AdminEditPropertyValue(ctx context.Context, req *v1.AdminEditPropertyValueRequest) (*v1.AdminPropertyResponse, error) {
	user_id := auth.GetUserUID(ctx)

	propertyValue := models.PropertyValue{}
	if req.Id != 0 {
		// if db.DB.Where("user_id = ?", user_id).First(&propertyValue, req.Id).RecordNotFound() {
		// 	return nil, status.Errorf(codes.NotFound, "Property value not found")
		// }
	}

	propertyValue.UserID = user_id
	propertyValue.PropertyID = uint(req.PropertyId)
	propertyValue.Value = req.Value
	propertyValue.Sort = uint(req.Sort)
	// if db.DB.Save(&propertyValue).Error != nil {
	// 	return nil, status.Errorf(codes.Aborted, "Save property value error")
	// }

	if req.Image != "" {
		directory := config.AppConfig.UploadPath + "/properties/" + strconv.Itoa(int(propertyValue.PropertyID)) + "/"
		file, err := upload.UploadImage(req.Image, directory, "thumb-"+strconv.Itoa(int(propertyValue.ID)), config.AppConfig.PropertyThumbSize)
		if err == nil {
			propertyValue.Image = *file
			//db.DB.Save(&propertyValue)
		}
	}
	return s.AdminProperty(ctx, &v1.AdminPropertyRequest{Id: req.PropertyId})
}

func (s *AdminPropertyServiceImpl) AdminDeletePropertyValue(ctx context.Context, req *v1.AdminPropertyValueRequest) (*v1.AdminPropertyResponse, error) {
	//user_id := auth.GetUserUID(ctx)
	propertyValue := models.PropertyValue{}
	// if db.DB.Where("user_id = ?", user_id).First(&propertyValue, req.Id).RecordNotFound() {
	// 	return nil, status.Errorf(codes.NotFound, "Property value not found")
	// }

	// if db.DB.Unscoped().Delete(&propertyValue).Error != nil {
	// 	return nil, status.Errorf(codes.Aborted, "Delete property value error")
	// }

	if propertyValue.Image != "" {
		directory := config.AppConfig.UploadPath + "/properties/" + strconv.Itoa(int(propertyValue.PropertyID)) + "/thumb-" + strconv.Itoa(int(propertyValue.ID)) + ".jpeg"
		os.RemoveAll(directory)
	}
	return s.AdminProperty(ctx, &v1.AdminPropertyRequest{Id: uint32(propertyValue.PropertyID)})
}

func (s *AdminPropertyServiceImpl) AdminUploadProperty(ctx context.Context, req *v1.AdminUploadPropertyRequest) (*v1.AdminPropertyResponse, error) {
	//user_id := auth.GetUserUID(ctx)

	//code := utils.Translit(strings.ToLower(req.Title))
	//property := models.Property{}
	// if db.DB.Where("user_id = ? AND code = ?", user_id, code).First(&property).RecordNotFound() {
	// 	property.UserID = user_id
	// 	property.Title = req.Title
	// 	property.Code = code
	// 	property.Type = models.PropertyType(models.StringProperty)
	// 	property.Display = models.PropertyDisplayType(models.PropertyDisplayList)
	// 	lastProperty := models.Property{}
	// 	db.DB.Where("user_id = ?", user_id).Order("sort DESC").First(&lastProperty)
	// 	property.Sort = lastProperty.Sort + 10
	// 	db.DB.Create(&property)
	// }

	propertyValue := models.PropertyValue{}
	// if db.DB.Where("user_id = ? AND value = ?", user_id, strings.ToLower(strings.TrimSpace(req.Value))).First(&propertyValue).RecordNotFound() {
	// 	propertyValue.UserID = user_id
	// 	propertyValue.PropertyID = property.ID
	// 	propertyValue.Value = req.Value
	// 	lastPropertyValue := models.PropertyValue{}
	// 	db.DB.Where("user_id = ? AND property_id = ?", user_id, property.ID).Order("sort DESC").First(&lastPropertyValue)
	// 	propertyValue.Sort = lastPropertyValue.Sort + 10
	// 	db.DB.Create(&propertyValue)
	// }

	//offer := models.Item{}
	// if db.DB.Where("user_id = ?", user_id).First(&offer, req.ItemId).RecordNotFound() {
	// 	return nil, status.Errorf(codes.NotFound, "Item not found")
	// }
	// if offer.ParentID != 0 {
	// 	offer.ID = 0
	// 	if db.DB.Where("user_id = ?", user_id).First(&offer, offer.ParentID).RecordNotFound() {
	// 		return nil, status.Errorf(codes.NotFound, "Parent item not found")
	// 	}
	// }
	//offerCategory := models.ItemsCategories{}
	//db.DB.Where("user_id = ? AND item_id = ?", user_id, offer.ID).First(&offerCategory)

	//propertyCategory := models.PropertiesCategories{}
	// if db.DB.Where("user_id = ? AND property_id = ? AND category_id = ?", user_id, propertyValue.ID, offerCategory.CategoryID).First(&propertyCategory).RecordNotFound() {
	// 	propertyCategory.UserID = user_id
	// 	propertyCategory.PropertyID = propertyValue.ID
	// 	propertyCategory.CategoryID = offerCategory.CategoryID
	// 	if db.DB.Save(&propertyCategory).Error != nil {
	// 		return nil, status.Errorf(codes.Aborted, "Error bind property ")
	// 	}
	// }

	//offerProperty := models.ItemProperty{}
	// if db.DB.Where("user_id = ? AND item_id = ? AND property_id = ? AND property_value_id = ?", user_id, req.ItemId, property.ID, propertyValue.ID).First(&offerProperty).RecordNotFound() {
	// 	offerProperty.UserID = user_id
	// 	offerProperty.ItemID = req.ItemId
	// 	offerProperty.PropertyID = uint32(property.ID)
	// 	offerProperty.PropertyValueID = uint32(propertyValue.ID)
	// 	if db.DB.Save(&offerProperty).Error != nil {
	// 		return nil, status.Errorf(codes.Aborted, "Error save item property ")
	// 	}
	// }

	return s.AdminProperty(ctx, &v1.AdminPropertyRequest{Id: uint32(propertyValue.PropertyID)})
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.AdminPropertyServiceServer = (*AdminPropertyServiceImpl)(nil)
