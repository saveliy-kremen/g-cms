package services

import (
	"context"
	"fmt"

	v1 "gcms/api/v1"
	"gcms/db"
	"gcms/models"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type VendorServiceImpl struct {
}

func (s *VendorServiceImpl) Vendor(ctx context.Context, req *v1.VendorRequest) (*v1.VendorResponse, error) {
	vendor := models.Vendor{}

	row := db.DB.QueryRow(ctx,
		`SELECT id, created_at, name, country
		FROM vendors
		WHERE id = $1`,
		req.Id)
	err := row.Scan(&vendor.ID, &vendor.CreatedAt, &vendor.Name, &vendor.Country)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Vendor not found")
	}

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

	db.DB.QueryRow(ctx, "SELECT count(*) FROM vendors").Scan(&total)
	query := fmt.Sprintf(
		`SELECT id, created_at, name, country
		FROM vendors
		ORDER BY %s OFFSET $1 LIMIT $2`,
		order)
	rows, err := db.DB.Query(ctx, query, req.Page*req.PageSize, limit)
	if err != nil {
		logger.Error(err.Error())
	}
	defer rows.Close()
	for rows.Next() {
		vendor := models.Vendor{}
		err := rows.Scan(&vendor.ID, &vendor.CreatedAt, &vendor.Name, &vendor.Country)
		if err != nil {
			logger.Error(err.Error())
		}
		vendors = append(vendors, vendor)
	}
	if err = rows.Err(); err != nil {
		logger.Error(err.Error())
	}

	return &v1.VendorsResponse{Vendors: models.VendorsToResponse(vendors), Total: total}, nil
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.VendorServiceServer = (*VendorServiceImpl)(nil)
