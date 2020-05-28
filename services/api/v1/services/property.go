package services

import (
	"context"

	//"github.com/golang/protobuf/ptypes/empty"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	v1 "../../../api/v1"
	"../../../db"
	"../../../models"
	"../../../packages/auth"
)

type PropertyServiceImpl struct {
}

func (s *PropertyServiceImpl) Property(ctx context.Context, req *v1.PropertyRequest) (*v1.PropertyResponse, error) {
	user_id := auth.GetUserUID(ctx)

	property := models.Property{}
	if db.DB.Preload("Values").Where("user_id = ?", user_id).First(&property, req.Id).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Property not found")
	}
	return &v1.PropertyResponse{Property: models.PropertyToResponse(property)}, nil
}

func (s *PropertyServiceImpl) Properties(ctx context.Context, req *v1.PropertiesRequest) (*v1.PropertiesResponse, error) {
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

// compile-type check that our new type provides the
// correct server interface
var _ v1.PropertyServiceServer = (*PropertyServiceImpl)(nil)
