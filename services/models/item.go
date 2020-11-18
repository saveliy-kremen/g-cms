package models

import (
	"database/sql"
	"encoding/json"
	"strconv"
	"time"

	v1 "gcms/api/v1"

	"github.com/jinzhu/gorm"
)

type Item struct {
	ID        uint64    `db:"id"`
	CreatedAt time.Time `db:"created_at"`

	UserID         uint32  `db:"user_id" json:"user_id"`
	Draft          bool    `db:"draft"`
	Title          string  `db:"title"`
	Article        string  `db:"article"`
	Alias          string  `db:"alias"`
	Images         string  `db:"images"`
	Description    string  `db:"description"`
	Price          float32 `db:"price"`
	OldPrice       float32 `db:"old_price" json:"old_price"`
	Count          int32   `db:"count"`
	InStock        bool    `db:"in_stock" json:"in_stock"`
	Disable        bool    `db:"disable"`
	Sort           uint32  `db:"sort"`
	SeoTitle       string  `db:"seo_title" json:"seo_title"`
	SeoDescription string  `db:"seo_description" json:"seo_description"`
	SeoKeywords    string  `db:"seo_keywords" json:"seo_keywords"`

	ParentID   sql.NullInt64 `db:"parent_id"`
	VendorID   uint32        `db:"vendor_id"`
	CurrencyID sql.NullInt32 `db:"currency_id"`

	Categories []Category
	Properties []Property

	Offers     []Item
	ItemOffers string
	Vendor     Vendor   `struct:"vendors"`
	Currency   Currency `struct:"currencies"`
}

type Offer struct {
	ID        uint64    `db:"id"`
	CreatedAt time.Time `db:"created_at""`

	UserID         uint32      `db:"user_id" json:"user_id"`
	Draft          bool        `db:"draft"`
	Title          string      `db:"title"`
	Article        string      `db:"article"`
	Alias          string      `db:"alias"`
	Images         []ItemImage `db:"images"`
	Description    string      `db:"description"`
	Price          float32     `db:"price"`
	OldPrice       float32     `db:"old_price" json:"old_price"`
	Count          int32       `db:"count"`
	InStock        bool        `db:"in_stock" json:"in_stock"`
	Disable        bool        `db:"disable"`
	Sort           uint32      `db:"sort"`
	SeoTitle       string      `db:"seo_title" json:"seo_title"`
	SeoDescription string      `db:"seo_description" json:"seo_description"`
	SeoKeywords    string      `db:"seo_keywords" json:"seo_keywords"`

	ParentID   sql.NullInt64 `db:"parent_id"`
	VendorID   uint32        `db:"vendor_id"`
	CurrencyID sql.NullInt32 `db:"currency_id"`

	Categories []Category
	Properties []Property

	Vendor   Vendor   `struct:"vendors"`
	Currency Currency `struct:"currencies"`
}

type UploadImage struct {
	Path     string
	Filename string
	Name     string
}

type ItemImage struct {
	Path            string
	Filename        string
	Name            string
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
		ParentId:       uint64(item.ParentID.Int64),
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

func AdminUploadImagesToResponse(images string) []*v1.AdminUploadImage {
	var uploadImages []UploadImage
	json.Unmarshal([]byte(images), &uploadImages)
	respImages := []*v1.AdminUploadImage{}
	for _, uploadImage := range uploadImages {
		respImages = append(respImages, AdminUploadImageToResponse(uploadImage))
	}
	return respImages
}

func AdminUploadImageToResponse(image UploadImage) *v1.AdminUploadImage {
	return &v1.AdminUploadImage{
		Path:     image.Path,
		Filename: image.Filename,
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
		Path:            image.Path,
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
		ParentId:       uint64(item.ParentID.Int64),
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

		Images:   ItemImagesToResponse(item.Images, item.ItemOffers),
		Offers:   OffersToResponse(item.ItemOffers),
		Vendor:   VendorToResponse(item.Vendor),
		Currency: CurrencyToResponse(item.Currency),
	}
}

func ItemImagesToResponse(images string, offers string) []*v1.ItemImage {
	var itemImages []ItemImage
	json.Unmarshal([]byte(images), &itemImages)
	respImages := []*v1.ItemImage{}
	if len(itemImages) > 0 {
		for _, itemImage := range itemImages {
			respImages = append(respImages, ItemImageToResponse(itemImage))
		}
	} else {
		var itemOffers []Offer
		json.Unmarshal([]byte(offers), &itemOffers)
		for _, itemOffer := range itemOffers {
			for _, itemImage := range itemOffer.Images {
				respImages = append(respImages, ItemImageToResponse(itemImage))
			}
		}
	}
	return respImages
}

func ItemImageToResponse(image ItemImage) *v1.ItemImage {
	return &v1.ItemImage{
		Path:            image.Path,
		Filename:        image.Filename,
		PropertyValueId: image.PropertyValueID,
	}
}

func OfferImagesToResponse(images []ItemImage) []*v1.ItemImage {
	respImages := []*v1.ItemImage{}
	for _, item := range images {
		respImages = append(respImages, OfferImageToResponse(item))
	}
	return respImages
}

func OfferImageToResponse(image ItemImage) *v1.ItemImage {
	return &v1.ItemImage{
		Path:            image.Path,
		Filename:        image.Filename,
		PropertyValueId: image.PropertyValueID,
	}
}

func OffersToResponse(offers string) []*v1.Item {
	var itemOffers []Offer
	json.Unmarshal([]byte(offers), &itemOffers)
	respOffers := []*v1.Item{}
	for _, offer := range itemOffers {
		respOffers = append(respOffers, OfferToResponse(offer))
	}
	return respOffers
}

func OfferToResponse(offer Offer) *v1.Item {
	return &v1.Item{
		Id:             strconv.Itoa(int(offer.ID)),
		UserId:         offer.UserID,
		ParentId:       uint64(offer.ParentID.Int64),
		Title:          offer.Title,
		Article:        offer.Article,
		Alias:          offer.Alias,
		Description:    offer.Description,
		Price:          offer.Price,
		OldPrice:       offer.OldPrice,
		Count:          offer.Count,
		InStock:        offer.InStock,
		Disable:        offer.Disable,
		Sort:           offer.Sort,
		SeoTitle:       offer.SeoTitle,
		SeoDescription: offer.SeoDescription,
		SeoKeywords:    offer.SeoKeywords,

		Images:   OfferImagesToResponse(offer.Images),
		Vendor:   VendorToResponse(offer.Vendor),
		Currency: CurrencyToResponse(offer.Currency),
	}
}
