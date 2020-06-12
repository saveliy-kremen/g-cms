package models

import (
	v1 "gcms/api/v1"

	"github.com/jinzhu/gorm"
)

type Vendor struct {
	gorm.Model

	Name    string
	Country string
}

func VendorToResponse(vendor Vendor) *v1.Vendor {
	return &v1.Vendor{
		Id:      uint32(vendor.ID),
		Name:    vendor.Name,
		Country: vendor.Country,
	}
}

func VendorsToResponse(vendors []Vendor) []*v1.Vendor {
	respVendors := []*v1.Vendor{}
	for _, vendor := range vendors {
		respVendors = append(respVendors, VendorToResponse(vendor))
	}
	return respVendors
}
