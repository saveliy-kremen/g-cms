package models

import (
	"strconv"
	"time"

	v1 "gcms/api/v1"
)

type Category struct {
	ID        uint32    `db:"id"`
	CreatedAt time.Time `db:"created_at"`

	UserID         uint32 `db:"user_id"`
	Title          string `db:"title"`
	Alias          string `db:"alias"`
	Description    string `db:"description"`
	Image          string `db:"image"`
	Parent         string `db:"parent"`
	Sort           int    `db:"sort"`
	Disabled       bool   `db:"disabled"`
	Opened         bool
	Selected       bool
	SeoTitle       string `db:"seo_title"`
	SeoDescription string `db:"seo_description"`
	SeoKeywords    string `db:"seo_keywords"`

	Children []Category
}

func AdminCategoryToResponse(category Category) *v1.AdminCategory {
	return &v1.AdminCategory{
		Id:          strconv.Itoa(int(category.ID)),
		UserId:      uint32(category.UserID),
		Text:        category.Title,
		Alias:       category.Alias,
		Description: category.Description,
		Image:       category.Image,
		Parent:      category.Parent,
		Sort:        uint32(category.Sort),
		State: &v1.AdminCategoryState{
			Disabled: category.Disabled,
			Opened:   category.Opened,
			Selected: category.Selected,
		},
		SeoTitle:       category.SeoTitle,
		SeoDescription: category.SeoDescription,
		SeoKeywords:    category.SeoKeywords,
	}
}

func AdminCategoriesToResponse(categories []Category) []*v1.AdminCategory {
	respCategories := []*v1.AdminCategory{}
	for _, category := range categories {
		if category.Parent == "#" {
			category.Opened = true
		} else {
			category.Opened = false
		}
		respCategories = append(respCategories, AdminCategoryToResponse(category))
	}
	return respCategories
}

func CategoryToResponse(category Category) *v1.Category {
	return &v1.Category{
		Id:             strconv.Itoa(int(category.ID)),
		UserId:         uint32(category.UserID),
		Text:           category.Title,
		Alias:          category.Alias,
		Description:    category.Description,
		Image:          category.Image,
		Parent:         category.Parent,
		Sort:           uint32(category.Sort),
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
