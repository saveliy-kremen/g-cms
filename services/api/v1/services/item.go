package services

import (
	"context"

	"github.com/jinzhu/gorm"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	v1 "../../../api/v1"
	"../../../config"
	"../../../db"
	"../../../models"
)

type ItemServiceImpl struct {
}

func (s *ItemServiceImpl) Item(ctx context.Context, req *v1.ItemRequest) (*v1.ItemResponse, error) {
	item := models.Item{}
	if db.DB.Preload("Vendor").Preload("Currency").Preload("Images", func(db *gorm.DB) *gorm.DB {
		return db.Order(config.AppConfig.Prefix + "_item_images.sort ASC")
	}).First(&item, req.Id).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Item not found")
	}
	item.Offers = itemOffers(&item, nil, nil, nil, nil)
	return &v1.ItemResponse{Item: models.ItemToResponse(item)}, nil
}

func (s *ItemServiceImpl) Items(ctx context.Context, req *v1.ItemsRequest) (*v1.ItemsResponse, error) {
	items := []models.Item{}
	var total uint32
	order := "sort"
	if req.Sort != "" {
		order = req.Sort + " " + req.Direction
	}
	db.DB.Where("draft <> ? AND parent_id = ?", true, 0).Find(&items).Count(&total)
	db.DB.Preload("Vendor").Preload("Currency").Preload("Images", func(db *gorm.DB) *gorm.DB {
		return db.Order(config.AppConfig.Prefix + "_item_images.sort ASC")
	}).Where("draft <> ? AND parent_id = ?", true, 0).Order(order).Offset(req.Page * req.PageSize).Limit(req.PageSize).Find(&items)
	for i, item := range items {
		db.DB.Preload("Vendor").Preload("Currency").Preload("Images", func(db *gorm.DB) *gorm.DB {
			return db.Order(config.AppConfig.Prefix + "_item_images.sort ASC")
		}).Where("parent_id = ?", item.ID).Order(order).Find(&items[i].Offers)
	}
	return &v1.ItemsResponse{Items: models.ItemsToResponse(items), Total: total}, nil
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.ItemServiceServer = (*ItemServiceImpl)(nil)
