package services

import (
	"context"
	"fmt"

	v1 "gcms/api/v1"
	"gcms/db"
	"gcms/models"

	"github.com/davecgh/go-spew/spew"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// array_to_string(array(
// 	select row_to_json(properties_values)
// 	from properties_values where property_id = properties.id
// 	order by sort
//   ), ',')

type ItemServiceImpl struct {
}

func (s *ItemServiceImpl) Item(ctx context.Context, req *v1.ItemRequest) (*v1.ItemResponse, error) {
	item := models.Item{}
	spew.Dump(req)
	row := db.DB.QueryRow(ctx,
		`SELECT items.id, items.created_at, items.user_id, items.vendor_id, items.parent_id,
			 items.draft, items.title, items.article, items.alias, items.images, items.description,
			 items.price, items.old_price, items.currency_id, items.count, items.in_stock, items.disable,
			 items.sort, items.seo_title, items.seo_description, items.seo_keywords,
			 vendors.id, vendors.created_at, vendors.name, vendors.country,
			 currencies.id, currencies.created_at, currencies.name, currencies.short_name, currencies.code,
			 currencies.rate,
			 '[' || array_to_string(array(
				SELECT row_to_json(row)
					FROM (
						SELECT offers.*
						FROM items offers
						WHERE offers.parent_id = items.id
						ORDER BY sort) row
			  ), ',') || ']'
			FROM items
			LEFT JOIN vendors ON items.vendor_id = vendors.id
			LEFT JOIN currencies ON items.currency_id = currencies.id
			WHERE items.id = $1`,
		req.Id)
	err := row.Scan(&item.ID, &item.CreatedAt, &item.UserID, &item.VendorID, &item.ParentID,
		&item.Draft, &item.Title, &item.Article, &item.Alias, &item.Images, &item.Description,
		&item.Price, &item.OldPrice, &item.CurrencyID, &item.Count, &item.InStock, &item.Disable,
		&item.Sort, &item.SeoTitle, &item.SeoDescription, &item.SeoKeywords,
		&item.Vendor.ID, &item.Vendor.CreatedAt, &item.Vendor.Name, &item.Vendor.Country,
		&item.Currency.ID, &item.Currency.CreatedAt, &item.Currency.Name, &item.Currency.ShortName,
		&item.Currency.Code, &item.Currency.Rate, &item.ItemOffers)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Item not found")
	}
	return &v1.ItemResponse{Item: models.ItemToResponse(item)}, nil
}

func (s *ItemServiceImpl) Items(ctx context.Context, req *v1.ItemsRequest) (*v1.ItemsResponse, error) {
	items := []models.Item{}
	var total uint32
	order := "sort"
	if req.Sort != "" {
		order = req.Sort + " " + req.Direction
	}

	db.DB.QueryRow(ctx, "SELECT count(*) FROM items WHERE draft <> $1 AND parent_id IS $2", true, nil).Scan(&total)
	query := fmt.Sprintf(
		`SELECT items.id, items.created_at, items.user_id, items.draft, items.title, items.article,
		items.alias, items.images, items.description, items.price, items.old_price, items.count,
		items.in_stock, items.disable, items.sort, items.seo_title, items.seo_description,
		items.seo_keywords, items.parent_id, items.vendor_id, items.currency_id, vendors.id,
		vendors.created_at, vendors.name, vendors.country, currencies.id, currencies.created_at,
		currencies.name, currencies.short_name, currencies.code, currencies.rate,
		'[' || array_to_string(array(
			SELECT row_to_json(row)
				FROM (
					SELECT offers.*
					FROM items offers
					WHERE offers.parent_id = items.id
					ORDER BY sort) row
		  ), ',') || ']'
		FROM items
		LEFT JOIN vendors ON items.vendor_id = vendors.id
		LEFT JOIN currencies ON items.currency_id = currencies.id
		WHERE draft <> $1 AND parent_id IS $2
		ORDER BY %s OFFSET $3 LIMIT $4`,
		order)
	rows, err := db.DB.Query(ctx, query, true, nil, req.Page*req.PageSize, req.PageSize)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Items not found")
	}
	defer rows.Close()
	for rows.Next() {
		item := models.Item{}
		err := rows.Scan(&item.ID, &item.CreatedAt, &item.UserID, &item.Draft, &item.Title,
			&item.Article, &item.Alias, &item.Images, &item.Description, &item.Price, &item.OldPrice,
			&item.Count, &item.InStock, &item.Disable, &item.Sort, &item.SeoTitle,
			&item.SeoDescription, &item.SeoKeywords, &item.ParentID, &item.VendorID, &item.CurrencyID,
			&item.Vendor.ID, &item.Vendor.CreatedAt, &item.Vendor.Name, &item.Vendor.Country,
			&item.Currency.ID, &item.Currency.CreatedAt, &item.Currency.Name, &item.Currency.ShortName,
			&item.Currency.Code, &item.Currency.Rate, &item.ItemOffers)
		if err != nil {
			logger.Error(err.Error())
		}
		items = append(items, item)
	}
	if err = rows.Err(); err != nil {
		return nil, status.Errorf(codes.NotFound, "Items set error")
	}

	return &v1.ItemsResponse{Items: models.ItemsToResponse(items), Total: total}, nil
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.ItemServiceServer = (*ItemServiceImpl)(nil)
