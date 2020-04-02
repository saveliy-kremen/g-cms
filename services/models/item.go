package models

import (
	v1 "../api/v1"
	"github.com/jinzhu/gorm"
	"strconv"
)

type Item struct {
	gorm.Model

	UserID         uint32
	VendorID       uint32
	ParentID       uint32
	CategoryID     uint32
	Title          string `sql:"type:text"`
	Article        string
	Alias          string
	Description    string  `sql:"type:text"`
	Price          float32 `sql:"type:decimal(10,2)"`
	OldPrice       float32 `sql:"type:decimal(10,2)"`
	CurrencyID     uint32
	Count          int32
	Disable        bool
	Sort           uint32
	SeoTitle       string `sql:"type:text" json:"seo_title"`
	SeoDescription string `sql:"type:text" json:"seo_description"`
	SeoKeywords    string `sql:"type:text" json:"seo_keywords"`

	Properties []Property
	Images     []ItemImage
	Currency   Currency
}

type ItemImage struct {
	gorm.Model

	ItemID          uint32
	Filename        string
	Sort            uint32
	PropertyValueID uint32
	Main            bool
}

type ItemProperty struct {
	gorm.Model

	ItemID          uint32
	PropertyID      uint32
	PropertyValueID uint32
}

type Currency struct {
	gorm.Model

	Name      string
	ShortName string
	Code      string
	Rate      float64
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
		UserID:         item.UserID,
		VendorID:       item.VendorID,
		ParentID:       item.ParentID,
		CategoryID:     item.CategoryID,
		Title:          item.Title,
		Article:        item.Article,
		Alias:          item.Alias,
		Description:    item.Description,
		Price:          item.Price,
		OldPrice:       item.OldPrice,
		CurrencyID:     item.CurrencyID,
		Count:          item.Count,
		Disable:        item.Disable,
		Sort:           item.Sort,
		SeoTitle:       item.SeoTitle,
		SeoDescription: item.SeoDescription,
		SeoKeywords:    item.SeoKeywords,
	}
}
