package models

import (
	v1 "../api/v1"
	"github.com/jinzhu/gorm"
	"strconv"
)

type Category struct {
	gorm.Model `json:"-"`

	UserID         uint
	Title          string
	Alias          string `gorm:"unique;not null"`
	Description    string
	Image          string
	Parent         string
	Sort           int
	Disabled       bool
	Opened         bool   `sql:"-"`
	Selected       bool   `sql:"-"`
	SeoTitle       string `sql:"type:text"`
	SeoDescription string `sql:"type:text"`
	SeoKeywords    string `sql:"type:text"`

	Children []Category
}

func CategoryToResponse(category Category) *v1.Category {
	return &v1.Category{
		Id:          strconv.Itoa(int(category.ID)),
		UserID:      uint32(category.UserID),
		Text:        category.Title,
		Alias:       category.Alias,
		Description: category.Description,
		Image:       category.Image,
		Parent:      category.Parent,
		Sort:        uint32(category.Sort),
		State: &v1.State{
			Disabled: category.Disabled,
			Opened:   category.Opened,
			Selected: category.Selected,
		},
		SeoTitle:       category.SeoTitle,
		SeoDescription: category.SeoDescription,
		SeoKeywords:    category.SeoKeywords,
	}
}

func CategoriesToResponse(categories []Category) []*v1.Category {
	respCategories := []*v1.Category{}
	for _, category := range categories {
		if category.Parent == "#" {
			category.Opened = true
		} else {
			category.Opened = false
		}
		respCategories = append(respCategories, CategoryToResponse(category))
	}
	return respCategories
}
