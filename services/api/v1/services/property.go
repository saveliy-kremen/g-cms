package services

import (
	"context"
	//"github.com/davecgh/go-spew/spew"
	//"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

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

		if category.ID == 1 {
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
	if db.DB.Where("user_id = ?", user_id).First(&category, req.CategoryID).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Category_not_found")
	}

	item := models.PropertiesCategories{}
	if db.DB.Where("property_id = ? AND category_id = ?", req.Id, req.CategoryID).First(&item).RecordNotFound() {
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

		if category.ID == 1 {
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
	if db.DB.Where("user_id = ?", user_id).First(&category, req.CategoryID).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Category_not_found")
	}

	item := models.PropertiesCategories{}
	if db.DB.Unscoped().Where("property_id = ? AND category_id = ?", req.Id, req.CategoryID).Delete(&item).Error != nil {
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

		if category.ID == 1 {
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

	propertyValue.PropertyID = uint(req.PropertyID)
	propertyValue.Value = req.Value
	propertyValue.Sort = uint(req.Sort)
	if db.DB.Save(&propertyValue).Error != nil {
		return nil, status.Errorf(codes.Aborted, "Save property value error")
	}

	if req.Image != "" {
		directory := config.AppConfig.UploadPath + "/properties/" + strconv.Itoa(int(propertyValue.ID)) + "/"
		file, err := upload.UploadImage(req.Image, directory, "property-"+strconv.Itoa(int(propertyValue.ID)))
		if err == nil {
			propertyValue.Image = file
			db.DB.Save(&propertyValue)
		}
	}
	return u.Property(ctx, &v1.PropertyRequest{Id: req.PropertyID})
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.PropertyServiceServer = (*PropertyServiceImpl)(nil)
