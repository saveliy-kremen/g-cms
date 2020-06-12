package models

import (
	"encoding/json"
	"strconv"
	"time"

	v1 "gcms/api/v1"

	"github.com/jinzhu/gorm"
)

type Item struct {
	ID        uint64
	CreatedAt time.Time `db:"created_at"`

	UserID         uint32
	VendorID       uint32
	ParentID       uint32
	Draft          bool
	Title          string `sql:"type:text"`
	Article        string
	Alias          string
	Images         string
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

	Offers   []Item
	Vendor   Vendor
	Currency Currency
}

type ItemImage struct {
	Filename        string
	PropertyValueID uint32
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

func AdminItemImagesToResponse(images string) []*v1.AdminItemImage {
	var itemImages []ItemImage
	json.Unmarshal([]byte(images), &itemImages)
	respImages := []*v1.AdminItemImage{}
	for _, itemImage := range itemImages {
		respImages = append(respImages, AdminItemImageToResponse(itemImage))
	}
	return respImages
}

func AdminItemImageToResponse(image ItemImage) *v1.AdminItemImage {
	return &v1.AdminItemImage{
		Filename:        image.Filename,
		PropertyValueId: image.PropertyValueID,
	}
}

func ItemsToResponse(items []Item) []*v1.Item {
	respItems := []*v1.Item{}
	for _, item := range items {
		respItems = append(respItems, ItemToResponse(item))
	}
	return respItems
}

func ItemToResponse(item Item) *v1.Item {
	return &v1.Item{
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

		Images:   ItemImagesToResponse(item.Images),
		Offers:   ItemsToResponse(item.Offers),
		Vendor:   VendorToResponse(item.Vendor),
		Currency: CurrencyToResponse(item.Currency),
	}
}

func ItemImagesToResponse(images string) []*v1.ItemImage {
	var itemImages []ItemImage
	json.Unmarshal([]byte(images), &itemImages)
	respImages := []*v1.ItemImage{}
	for _, itemImage := range itemImages {
		respImages = append(respImages, ItemImageToResponse(itemImage))
	}
	return respImages
}

func ItemImageToResponse(image ItemImage) *v1.ItemImage {
	return &v1.ItemImage{
		Filename:        image.Filename,
		PropertyValueId: image.PropertyValueID,
	}
}
