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

type AdminOrderServiceImpl struct {
}

func (s *AdminOrderServiceImpl) AdminOrder(ctx context.Context, req *v1.AdminOrderRequest) (*v1.AdminOrderResponse, error) {
	order := models.Order{}
	if db.DB.First(&order, req.Id).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Order not found")
	}

	db.DB.Preload("Images", func(db *gorm.DB) *gorm.DB {
		return db.Order(config.AppConfig.Prefix + "_item_images.sort ASC")
	}).Where("order_id = ?", order.ID).Find(&order.Items)

	return &v1.AdminOrderResponse{Order: models.AdminOrderToResponse(order)}, nil
}

func (s *AdminOrderServiceImpl) AdminOrders(ctx context.Context, req *v1.AdminOrdersRequest) (*v1.AdminOrdersResponse, error) {
	orders := []models.Order{}
	var total uint32
	order := ""
	if req.Sort != "" {
		order = req.Sort + " " + req.Direction
	}
	db.DB.Find(&orders).Count(&total)
	db.DB.Order(order).Offset(req.Page * req.PageSize).Limit(req.PageSize).Find(&orders)

	for i, _ := range orders {
		var itemsIds []uint32
		orderItems := []models.OrderItem{}
		db.DB.Where("order_id = ?", orders[i].ID).Find(&orderItems)
		for _, orderItem := range orderItems {
			itemsIds = append(itemsIds, orderItem.ItemID)
		}
		db.DB.Preload("Images", func(db *gorm.DB) *gorm.DB {
			return db.Order(config.AppConfig.Prefix + "_item_images.sort ASC")
		}).Where("id IN(?)", itemsIds).Find(&orders[i].Items)
	}

	return &v1.AdminOrdersResponse{Orders: models.AdminOrdersToResponse(orders), Total: total}, nil
}

func (s *AdminOrderServiceImpl) AdminDeleteOrder(ctx context.Context, req *v1.AdminDeleteOrderRequest) (*v1.AdminOrdersResponse, error) {
	order := models.Order{}
	if db.DB.First(&order, req.Id).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Order not found")
	}
	if err := db.DB.Unscoped().Delete(&order); err != nil {
		return nil, status.Errorf(codes.Aborted, "Error delete item")
	}
	orderItems := []models.OrderItem{}
	db.DB.Where("order_id = ?", order.ID).Find(&orderItems)
	for _, orderItem := range orderItems {
		db.DB.Unscoped().Delete(&orderItem)
	}

	return s.AdminOrders(ctx, &v1.AdminOrdersRequest{Page: req.Page, PageSize: req.PageSize, Sort: req.Sort, Direction: req.Direction})
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.AdminOrderServiceServer = (*AdminOrderServiceImpl)(nil)
