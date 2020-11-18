package models

import (
	"database/sql"
	v1 "gcms/api/v1"
	"time"
)

type Vendor struct {
	ID        uint32    `db:"id"`
	CreatedAt time.Time `db:"created_at"`

	Name    string         `db:"name"`
	Country sql.NullString `db:"country"`
}

func VendorToResponse(vendor Vendor) *v1.Vendor {
	return &v1.Vendor{
		Id:      vendor.ID,
		Name:    vendor.Name,
		Country: vendor.Country.String,
	}
}

func VendorsToResponse(vendors []Vendor) []*v1.Vendor {
	respVendors := []*v1.Vendor{}
	for _, vendor := range vendors {
		respVendors = append(respVendors, VendorToResponse(vendor))
	}
	return respVendors
}
