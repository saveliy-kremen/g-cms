package services

import (
	"context"
	"github.com/davecgh/go-spew/spew"
	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	//"strconv"
	"strings"

	v1 "../../../api/v1"
	//"../../../config"
	"../../../db"
	"../../../models"
	"../../../packages/auth"
	"../../../packages/utils"
)

type PropertyServiceImpl struct {
}

func (u *PropertyServiceImpl) Property(ctx context.Context, req *empty.Empty) (*v1.PropertyResponse, error) {
	user_id := auth.GetUserUID(ctx)

	property := models.Property{}

	if db.DB.Preload("Values").Where("user_id = ?", user_id).First(&property).RecordNotFound() {
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
	spew.Dump(order)
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

// compile-type check that our new type provides the
// correct server interface
var _ v1.PropertyServiceServer = (*PropertyServiceImpl)(nil)
