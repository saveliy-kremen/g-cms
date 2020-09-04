package services

import (
	"context"
	"fmt"

	"github.com/davecgh/go-spew/spew"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	v1 "gcms/api/v1"
	"gcms/db"
	"gcms/models"
)

type AdminOrderServiceImpl struct {
}

func (s *AdminOrderServiceImpl) AdminOrder(ctx context.Context, req *v1.AdminOrderRequest) (*v1.AdminOrderResponse, error) {
	order := models.Order{}
	row := db.DB.QueryRow(ctx,
		`SELECT name, phone, address, payment
			FROM orders
			WHERE id = $1`,
		req.Id)
	err := row.Scan(&order.Name, &order.Phone, &order.Address, &order.Payment)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Order not found")
	}
	spew.Dump(order)

	query := fmt.Sprintf(
		`SELECT items.id, items.created_at, items.user_id, items.draft, items.title, items.article,
		items.alias, items.images, items.description, items.price, items.old_price, items.count,
		items.in_stock, items.disable, items.sort, items.seo_title, items.seo_description,
		items.seo_keywords, items.parent_id, items.vendor_id, items.currency_id, vendors.id,
		vendors.created_at, vendors.name, vendors.country, currencies.id, currencies.created_at,
		currencies.name, currencies.short_name, currencies.code, currencies.rate
		FROM items
		LEFT JOIN vendors ON items.vendor_id = vendors.id
		LEFT JOIN currencies ON items.currency_id = currencies.id
		WHERE order_id = $1`)
	rows, err := db.DB.Query(ctx, query, req.Id)
	defer rows.Close()
	for rows.Next() {
		item := models.Item{}
		err := rows.Scan(&item.ID, &item.CreatedAt, &item.UserID, &item.Draft, &item.Title,
			&item.Article, &item.Alias, &item.Images, &item.Description, &item.Price, &item.OldPrice,
			&item.Count, &item.InStock, &item.Disable, &item.Sort, &item.SeoTitle,
			&item.SeoDescription, &item.SeoKeywords, &item.ParentID, &item.VendorID, &item.CurrencyID,
			&item.Vendor.ID, &item.Vendor.CreatedAt, &item.Vendor.Name, &item.Vendor.Country,
			&item.Currency.ID, &item.Currency.CreatedAt, &item.Currency.Name, &item.Currency.ShortName,
			&item.Currency.Code, &item.Currency.Rate)
		if err != nil {
			logger.Error(err.Error())
		}
		order.Items = append(order.Items, item)
	}
	if err = rows.Err(); err != nil {
		return nil, status.Errorf(codes.NotFound, "Items set error")
	}
	return &v1.AdminOrderResponse{Order: models.AdminOrderToResponse(order)}, nil
}

func (s *AdminOrderServiceImpl) AdminOrders(ctx context.Context, req *v1.AdminOrdersRequest) (*v1.AdminOrdersResponse, error) {
	orders := []models.Order{}
	var total uint32
	order := "created_at DESC"
	if req.Sort != "" {
		order = req.Sort + " " + req.Direction
	}

	err := db.DB.QueryRow(ctx, "SELECT count(*) FROM orders").Scan(&total)
	query := fmt.Sprintf(
		`SELECT name, phone, address, payment
		FROM orders
		ORDER BY %s OFFSET $1 LIMIT $2`,
		order)
	rows, err := db.DB.Query(ctx, query, req.Page*req.PageSize, req.PageSize)
	defer rows.Close()
	for rows.Next() {
		order := models.Order{}
		err := rows.Scan(&order.Name, &order.Phone, &order.Address, &order.Payment)
		if err != nil {
			logger.Error(err.Error())
		}
		orders = append(orders, order)
	}
	if err = rows.Err(); err != nil {
		return nil, status.Errorf(codes.NotFound, "Orders set error")
	}
	return &v1.AdminOrdersResponse{Orders: models.AdminOrdersToResponse(orders), Total: total}, nil
}

func (s *AdminOrderServiceImpl) AdminDeleteOrder(ctx context.Context, req *v1.AdminDeleteOrderRequest) (*v1.AdminOrdersResponse, error) {
	_, err := db.DB.Exec(ctx,
		`DELETE FROM orders WHERE id = $1`,
		req.Id)
	if err != nil {
		return nil, status.Errorf(codes.Aborted, "Error delete order")
	}

	return s.AdminOrders(ctx, &v1.AdminOrdersRequest{Page: req.Page, PageSize: req.PageSize, Sort: req.Sort, Direction: req.Direction})
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.AdminOrderServiceServer = (*AdminOrderServiceImpl)(nil)
