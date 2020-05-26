package services

import (
	"context"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	v1 "../../../api/v1"
	"../../../db"
	"../../../models"
)

type VendorServiceImpl struct {
}

func (u *VendorServiceImpl) Vendor(ctx context.Context, req *v1.VendorRequest) (*v1.VendorResponse, error) {
	vendor := models.Vendor{}
	if db.DB.First(&vendor, req.Id).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Vendor not found")
	}
	return &v1.VendorResponse{Vendor: models.VendorToResponse(vendor)}, nil
}

func (u *VendorServiceImpl) Vendors(ctx context.Context, req *v1.VendorsRequest) (*v1.VendorsResponse, error) {
	vendors := []models.Vendor{}
	var total uint32
	order := "sort"
	if req.Sort != "" {
		order = req.Sort + " " + req.Direction
	}
	limit := req.PageSize
	if limit == 0 {
		limit = ^uint32(0)
	}
	db.DB.Find(&vendors).Count(&total)
	db.DB.Order(order).Offset(req.Page * req.PageSize).Limit(limit).Find(&vendors)
	return &v1.VendorsResponse{Vendors: models.VendorsToResponse(vendors), Total: total}, nil
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.VendorServiceServer = (*VendorServiceImpl)(nil)