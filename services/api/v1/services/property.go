package services

import (
	"context"
	//"github.com/davecgh/go-spew/spew"
	//"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"os"
	"strconv"
	"strings"

	v1 "../../../api/v1"
	"../../../config"
	"../../../db"
	"../../../models"
	"../../../packages/auth"
	"../../../packages/upload"
	"../../../packages/utils"
)

type PropertyServiceImpl struct {
}

func (u *PropertyServiceImpl) Property(ctx context.Context, req *v1.PropertyRequest) (*v1.PropertyResponse, error) {
	user_id := auth.GetUserUID(ctx)

	property := models.Property{}
	if db.DB.Preload("Values").Where("user_id = ?", user_id).First(&property, req.Id).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Property not found")
	}
	return &v1.PropertyResponse{Property: models.PropertyToResponse(property)}, nil
}

func (u *PropertyServiceImpl) Properties(ctx context.Context, req *v1.PropertiesRequest) (*v1.PropertiesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	properties := []models.Property{}
	var total uint32
	order := "sort"
	if req.Sort != "" {
		order = req.Sort + " " + req.Direction
	}
	db.DB.Where("user_id = ?", user_id).Order("sort").Find(&properties).Count(&total)
	db.DB.Where("user_id = ?", user_id).Order(order).Offset(req.Page * req.PageSize).Limit(req.PageSize).Find(&properties)
	return &v1.PropertiesResponse{Properties: models.PropertiesToResponse(properties), Position: (req.Page * req.PageSize) + 1, Total: total}, nil
}

func (u *PropertyServiceImpl) EditProperty(ctx context.Context, req *v1.EditPropertyRequest) (*v1.PropertyResponse, error) {
	user_id := auth.GetUserUID(ctx)

	property := models.Property{}
	if req.Id != 0 {
		if db.DB.Where("user_id = ?", user_id).First(&property, req.Id).RecordNotFound() {
			return nil, status.Errorf(codes.NotFound, "Property not found")
		}
	}

	property.UserID = user_id
	property.Title = req.Title
	property.Code = req.Code
	if property.Code == "" {
		property.Code = utils.Translit(strings.ToLower(property.Title))
	}
	property.Type = models.PropertyType(req.Type)
	property.Display = models.PropertyDisplayType(req.Display)
	property.Plural = req.Plural
	property.Sort = uint(req.Sort)
	if db.DB.Save(&property).Error != nil {
		return nil, status.Errorf(codes.Aborted, "Error create property")
	}
	return &v1.PropertyResponse{Property: models.PropertyToResponse(property)}, nil
}

func (u *PropertyServiceImpl) DeleteProperty(ctx context.Context, req *v1.DeletePropertyRequest) (*v1.PropertiesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	if db.DB.Unscoped().Where("user_id=? AND id = ?", user_id, req.Id).Delete(&models.Property{}).Error != nil {
		return nil, status.Errorf(codes.Aborted, "Error delete property")
	} else {
		propertyValues := []models.PropertyValue{}
		db.DB.Where("user_id = ? AND property_id = ?", user_id, req.Id).Find(&propertyValues)
		for _, propertyValue := range propertyValues {
			db.DB.Unscoped().Delete(&propertyValue)
		}
		directory := config.AppConfig.UploadPath + "/properties/" + strconv.Itoa(int(req.Id))
		os.RemoveAll(directory)
	}
	return u.Properties(ctx, &v1.PropertiesRequest{Page: req.Page, PageSize: req.PageSize, Sort: req.Sort, Direction: req.Direction})
}

func (u *PropertyServiceImpl) PropertyCategories(ctx context.Context, req *v1.PropertyRequest) (*v1.CategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	property := models.Property{}
	if req.Id != 0 {
		if db.DB.Where("user_id = ?", user_id).First(&property, req.Id).RecordNotFound() {
			return nil, status.Errorf(codes.NotFound, "Property not found")
		}
	}

	categories := []models.Category{}
	db.DB.Model(&property).Related(&categories, "Categories")
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

func (u *PropertyServiceImpl) PropertyBindCategory(ctx context.Context, req *v1.PropertyBindRequest) (*v1.CategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	property := models.Property{}
	if db.DB.Where("user_id = ?", user_id).First(&property, req.Id).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Property not found")
	}

	category := models.Category{}
	if db.DB.Where("user_id = ?", user_id).First(&category, req.CategoryId).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Category_not_found")
	}

	item := models.PropertiesCategories{}
	if db.DB.Where("user_id = ? AND property_id = ? AND category_id = ?", user_id, req.Id, req.CategoryId).First(&item).RecordNotFound() {
		item.UserID = user_id
		item.PropertyID = uint(req.Id)
		item.CategoryID = category.ID
		if db.DB.Save(&item).Error != nil {
			return nil, status.Errorf(codes.Aborted, "Error bind category")
		}
	}

	categories := []models.Category{}
	db.DB.Model(&property).Related(&categories, "Categories")
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

func (u *PropertyServiceImpl) PropertyUnbindCategory(ctx context.Context, req *v1.PropertyBindRequest) (*v1.CategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	property := models.Property{}
	if db.DB.Where("user_id = ?", user_id).First(&property, req.Id).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Property not found")
	}

	category := models.Category{}
	if db.DB.Where("user_id = ?", user_id).First(&category, req.CategoryId).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Category_not_found")
	}

	item := models.PropertiesCategories{}
	if db.DB.Unscoped().Where("user_id = ? AND property_id = ? AND category_id = ?", user_id, req.Id, req.CategoryId).Delete(&item).Error != nil {
		return nil, status.Errorf(codes.Aborted, "Error unbind category")
	}

	categories := []models.Category{}
	db.DB.Model(&property).Related(&categories, "Categories")
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

func (u *PropertyServiceImpl) EditPropertyValue(ctx context.Context, req *v1.EditPropertyValueRequest) (*v1.PropertyResponse, error) {
	user_id := auth.GetUserUID(ctx)

	propertyValue := models.PropertyValue{}
	if req.Id != 0 {
		if db.DB.Where("user_id = ?", user_id).First(&propertyValue, req.Id).RecordNotFound() {
			return nil, status.Errorf(codes.NotFound, "Property value not found")
		}
	}

	propertyValue.UserID = user_id
	propertyValue.PropertyID = uint(req.PropertyId)
	propertyValue.Value = req.Value
	propertyValue.Sort = uint(req.Sort)
	if db.DB.Save(&propertyValue).Error != nil {
		return nil, status.Errorf(codes.Aborted, "Save property value error")
	}

	if req.Image != "" {
		directory := config.AppConfig.UploadPath + "/properties/" + strconv.Itoa(int(propertyValue.PropertyID)) + "/"
		file, err := upload.UploadImage(req.Image, directory, "thumb-"+strconv.Itoa(int(propertyValue.ID)))
		if err == nil {
			propertyValue.Image = file
			db.DB.Save(&propertyValue)
		}
	}
	return u.Property(ctx, &v1.PropertyRequest{Id: req.PropertyId})
}

func (u *PropertyServiceImpl) DeletePropertyValue(ctx context.Context, req *v1.PropertyValueRequest) (*v1.PropertyResponse, error) {
	user_id := auth.GetUserUID(ctx)
	propertyValue := models.PropertyValue{}
	if db.DB.Where("user_id = ?", user_id).First(&propertyValue, req.Id).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Property value not found")
	}

	if db.DB.Unscoped().Delete(&propertyValue).Error != nil {
		return nil, status.Errorf(codes.Aborted, "Delete property value error")
	}

	if propertyValue.Image != "" {
		directory := config.AppConfig.UploadPath + "/properties/" + strconv.Itoa(int(propertyValue.PropertyID)) + "/thumb-" + strconv.Itoa(int(propertyValue.ID)) + ".jpeg"
		os.RemoveAll(directory)
	}
	return u.Property(ctx, &v1.PropertyRequest{Id: uint32(propertyValue.PropertyID)})
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.PropertyServiceServer = (*PropertyServiceImpl)(nil)
