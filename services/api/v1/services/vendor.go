package services

import (
	"context"

	v1 "gcms/api/v1"
	"gcms/models"

	"github.com/davecgh/go-spew/spew"
)

type VendorServiceImpl struct {
}

func (s *VendorServiceImpl) Vendor(ctx context.Context, req *v1.VendorRequest) (*v1.VendorResponse, error) {
	vendor := models.Vendor{}
	// err := db.DB.GetContext(ctx, &vendor, "SELECT * FROM vendors WHERE id=$1", req.Id)
	// if err != nil {
	// 	return nil, status.Errorf(codes.NotFound, "Vendor not found")
	// }
	return &v1.VendorResponse{Vendor: models.VendorToResponse(vendor)}, nil
}

func (s *VendorServiceImpl) Vendors(ctx context.Context, req *v1.VendorsRequest) (*v1.VendorsResponse, error) {
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
	spew.Dump(order)
	//db.DB.GetContext(ctx, &total, "SELECT count(*) FROM vendors")
	//query := fmt.Sprintf("SELECT * FROM vendors ORDER BY %s OFFSET $1 LIMIT $2", order)
	//db.DB.SelectContext(ctx, &vendors, query, req.Page*req.PageSize, limit)
	return &v1.VendorsResponse{Vendors: models.VendorsToResponse(vendors), Total: total}, nil
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.VendorServiceServer = (*VendorServiceImpl)(nil)
