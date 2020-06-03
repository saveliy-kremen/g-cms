package models

import (
	"strconv"

	v1 "../api/v1"
	"github.com/jinzhu/gorm"
)

type Order struct {
	gorm.Model `json:"-"`

	Name    string
	Phone   string
	Address string
	Payment string

	Items []Item
}

type OrderItem struct {
	OrderID uint
	ItemID  uint32
}

func OrderToResponse(order Order) *v1.Order {
	return &v1.Order{
		Id:      strconv.Itoa(int(order.ID)),
		Name:    order.Name,
		Phone:   order.Phone,
		Address: order.Address,
		Payment: order.Payment,

		Items: ItemsToResponse(order.Items),
	}
}

func OrdersToResponse(orders []Order) []*v1.Order {
	respOrders := []*v1.Order{}
	for _, order := range orders {
		respOrders = append(respOrders, OrderToResponse(order))
	}
	return respOrders
}
