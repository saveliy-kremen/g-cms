package models

import (
	"strconv"

	v1 "../api/v1"
	"github.com/jinzhu/gorm"
)

type Item struct {
	gorm.Model

	UserID         uint32
	VendorID       uint32
	ParentID       uint32
	Draft          bool
	Title          string `sql:"type:text"`
	Article        string
	Alias          string
	Description    string  `sql:"type:text"`
	Price          float32 `sql:"type:decimal(10,2)"`
	OldPrice       float32 `sql:"type:decimal(10,2)"`
	CurrencyID     uint32
	Count          int32
	InStock        bool
	Disable        bool
	Sort           uint32
	SeoTitle       string `sql:"type:text" json:"seo_title"`
	SeoDescription string `sql:"type:text" json:"seo_description"`
	SeoKeywords    string `sql:"type:text" json:"seo_keywords"`

	Categories []Category `gorm:"many2many:items_categories;"`
	Properties []Property
	Images     []ItemImage
	Offers     []Item
	Vendor     Vendor
	Currency   Currency
}

type ItemImage struct {
	gorm.Model

	UserID          uint32
	ItemID          uint32
	Filename        string
	Sort            uint32
	PropertyValueID uint32
	Main            bool
}

type ItemProperty struct {
	gorm.Model

	UserID          uint32
	ItemID          uint32
	PropertyID      uint32
	PropertyValueID uint32
}

type ItemsCategories struct {
	UserID     uint32
	ItemID     uint
	CategoryID uint
}

func AdminItemsToResponse(items []Item) []*v1.AdminItem {
	respItems := []*v1.AdminItem{}
	for _, item := range items {
		respItems = append(respItems, AdminItemToResponse(item))
	}
	return respItems
}

func AdminItemToResponse(item Item) *v1.AdminItem {
	return &v1.AdminItem{
		Id:             strconv.Itoa(int(item.ID)),
		UserId:         item.UserID,
		ParentId:       item.ParentID,
		Title:          item.Title,
		Article:        item.Article,
		Alias:          item.Alias,
		Description:    item.Description,
		Price:          item.Price,
		OldPrice:       item.OldPrice,
		Count:          item.Count,
		InStock:        item.InStock,
		Disable:        item.Disable,
		Sort:           item.Sort,
		SeoTitle:       item.SeoTitle,
		SeoDescription: item.SeoDescription,
		SeoKeywords:    item.SeoKeywords,

		Images:   AdminItemImagesToResponse(item.Images),
		Offers:   AdminItemsToResponse(item.Offers),
		Vendor:   VendorToResponse(item.Vendor),
		Currency: CurrencyToResponse(item.Currency),
	}
}

func AdminItemImagesToResponse(images []ItemImage) []*v1.AdminItemImage {
	respImages := []*v1.AdminItemImage{}
	for _, image := range images {
		respImages = append(respImages, AdminItemImageToResponse(image))
	}
	return respImages
}

func AdminItemImageToResponse(image ItemImage) *v1.AdminItemImage {
	return &v1.AdminItemImage{
		Id:              uint32(image.ID),
		UserId:          image.UserID,
		ItemId:          image.ItemID,
		Filename:        image.Filename,
		Sort:            image.Sort,
		PropertyValueId: image.PropertyValueID,
		Main:            image.Main,
	}
}
