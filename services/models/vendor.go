package models

import (
	"database/sql"
	v1 "gcms/api/v1"
)

type Vendor struct {
	ID        sql.NullInt32 `db:"id"`
	CreatedAt sql.NullTime  `db:"created_at"`

	Name    sql.NullString `db:"name"`
	Country sql.NullString `db:"country"`
}

func VendorToResponse(vendor Vendor) *v1.Vendor {
	return &v1.Vendor{
		Id:      uint32(vendor.ID.Int32),
		Name:    vendor.Name.String,
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
