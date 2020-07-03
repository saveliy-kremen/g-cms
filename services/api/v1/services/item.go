package services

import (
	"context"

	v1 "gcms/api/v1"
	"gcms/models"
)

type ItemServiceImpl struct {
}

func (s *ItemServiceImpl) Item(ctx context.Context, req *v1.ItemRequest) (*v1.ItemResponse, error) {
	item := models.Item{}
	// err := db.DB.GetContext(ctx, &item, "SELECT * FROM items WHERE id = $1", req.Id)
	// if err == sql.ErrNoRows {
	// 	return nil, status.Errorf(codes.NotFound, "Item not found")
	// } else if err != nil {
	// 	return nil, status.Errorf(codes.NotFound, "Item not found")
	// }

	//db.DB.Preload("Vendor").Preload("Currency")

	//item.Offers = itemOffers(&item, nil, nil, nil, nil)
	return &v1.ItemResponse{Item: models.ItemToResponse(item)}, nil
}

func (s *ItemServiceImpl) Items(ctx context.Context, req *v1.ItemsRequest) (*v1.ItemsResponse, error) {
	items := []models.Item{}
	var total uint32
	// order := "sort"
	// if req.Sort != "" {
	// 	order = req.Sort + " " + req.Direction
	// }

	//db.DB.GetContext(ctx, &total, "SELECT count(*) FROM items WHERE draft <> $1 AND parent_id = $2", true, 0)
	//db.DB.SelectContext(ctx, &items, "SELECT * FROM items WHERE draft <> $1 AND parent_id = $2 ORDER BY $3 OFFSET $4 LIMIT $5", true, 0, order, req.Page*req.PageSize, req.PageSize)

	//db.DB.Preload("Vendor").Preload("Currency")

	/*
		for i, item := range items {
			db.DB.Preload("Vendor").Preload("Currency").Preload("Images", func(db *gorm.DB) *gorm.DB {
				return db.Order(config.AppConfig.Prefix + "_item_images.sort ASC")
			}).Where("parent_id = ?", item.ID).Order(order).Find(&items[i].Offers)
		}
	*/
	return &v1.ItemsResponse{Items: models.ItemsToResponse(items), Total: total}, nil
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.ItemServiceServer = (*ItemServiceImpl)(nil)
