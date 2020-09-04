package services

import (
	"context"

	v1 "gcms/api/v1"
	"gcms/db"
	"gcms/models"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type OrderServiceImpl struct {
}

func (s *OrderServiceImpl) AddOrder(ctx context.Context, req *v1.AddOrderRequest) (*v1.OrderResponse, error) {
	order := models.Order{}
	order.Name = req.Name
	order.Phone = req.Phone
	order.Address = req.Address
	order.Payment = req.Payment

	row := db.DB.QueryRow(ctx, "INSERT INTO orders (name, phone, address, payment) VALUES($1, $2, $3, $4) RETURNING (id)", order.Name, order.Phone, order.Address, order.Payment)
	err := row.Scan(&order.ID)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.Aborted, "Add order error")
	}

	for _, itemID := range req.ItemId {
		orderItem := models.OrderItem{}
		orderItem.OrderID = order.ID
		orderItem.ItemID = itemID

		_, err := db.DB.Exec(ctx, "INSERT INTO orders_items (order_id, item_id) VALUES($1, $2)", orderItem.OrderID, orderItem.ItemID)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.Aborted, "Add order error")
		}
	}

	return &v1.OrderResponse{Order: models.OrderToResponse(order)}, nil
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.OrderServiceServer = (*OrderServiceImpl)(nil)
