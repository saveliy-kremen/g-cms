package services

import (
	"context"

	v1 "../../../api/v1"
	"../../../db"
	"../../../models"
)

type OrderServiceImpl struct {
}

func (s *OrderServiceImpl) AddOrder(ctx context.Context, req *v1.AddOrderRequest) (*v1.OrderResponse, error) {
	order := models.Order{}
	order.Name = req.Name
	order.Phone = req.Phone
	order.Address = req.Address
	order.Payment = req.Payment
	db.DB.Create(&order)

	for _, itemID := range req.ItemId {
		orderItem := models.OrderItem{}
		orderItem.OrderID = order.ID
		orderItem.ItemID = itemID
		db.DB.Create(&orderItem)
	}

	return &v1.OrderResponse{Order: models.OrderToResponse(order)}, nil
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.OrderServiceServer = (*OrderServiceImpl)(nil)
