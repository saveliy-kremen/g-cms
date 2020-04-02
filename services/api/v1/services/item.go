package services

import (
	"context"
	//"github.com/davecgh/go-spew/spew"
	//"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	//"os"
	//"strconv"
	"strings"

	v1 "../../../api/v1"
	//"../../../config"
	"../../../db"
	"../../../models"
	"../../../packages/auth"
	"../../../packages/utils"
)

type ItemServiceImpl struct {
}

func (u *ItemServiceImpl) Item(ctx context.Context, req *v1.ItemRequest) (*v1.ItemResponse, error) {
	user_id := auth.GetUserUID(ctx)

	item := models.Item{}
	if db.DB.Preload("Images").Where("user_id = ?", user_id).First(&item, req.Id).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Item not found")
	}
	return &v1.ItemResponse{Item: models.ItemToResponse(item)}, nil
}

func (u *ItemServiceImpl) Items(ctx context.Context, req *v1.ItemsRequest) (*v1.ItemsResponse, error) {
	user_id := auth.GetUserUID(ctx)

	items := []models.Item{}
	var total uint32
	order := "sort"
	if req.Sort != "" {
		order = req.Sort + " " + req.Direction
	}
	db.DB.Where("user_id = ?", user_id).Order("sort").Find(&items).Count(&total)
	db.DB.Where("user_id = ?", user_id).Order(order).Offset(req.Page * req.PageSize).Limit(req.PageSize).Find(&items)
	return &v1.ItemsResponse{Items: models.ItemsToResponse(items), Total: total}, nil
}

func (u *ItemServiceImpl) EditItem(ctx context.Context, req *v1.EditItemRequest) (*v1.ItemResponse, error) {
	user_id := auth.GetUserUID(ctx)

	item := models.Item{}
	if req.Id != 0 {
		if db.DB.Where("user_id = ?", user_id).First(&item, req.Id).RecordNotFound() {
			return nil, status.Errorf(codes.NotFound, "Item not found")
		}
	}

	item.UserID = user_id
	item.Title = req.Title
	item.Article = req.Article
	if item.Article == "" {
		item.Article = utils.Translit(strings.ToLower(item.Title))
	}
	item.Alias = req.Alias
	item.Count = req.Count
	item.Description = req.Description
	item.Price = req.Price
	item.OldPrice = req.OldPrice
	item.CurrencyID = req.CurrencyID
	item.Disable = req.Disable
	item.Sort = req.Sort
	if db.DB.Save(&item).Error != nil {
		return nil, status.Errorf(codes.Aborted, "Error create item")
	}
	return &v1.ItemResponse{Item: models.ItemToResponse(item)}, nil
}

func (u *ItemServiceImpl) DeleteItem(ctx context.Context, req *v1.DeleteItemRequest) (*v1.ItemsResponse, error) {
	user_id := auth.GetUserUID(ctx)

	if db.DB.Unscoped().Where("user_id=? AND id = ?", user_id, req.Id).Delete(&models.Item{}).Error != nil {
		return nil, status.Errorf(codes.Aborted, "Error delete item")
	} else {
		/*
			propertyValues := []models.PropertyValue{}
			db.DB.Where("user_id = ? AND property_id = ?", user_id, req.Id).Find(&propertyValues)
			for _, propertyValue := range propertyValues {
				db.DB.Unscoped().Delete(&propertyValue)
			}
			directory := config.AppConfig.UploadPath + "/properties/" + strconv.Itoa(int(req.Id))
			os.RemoveAll(directory)
		*/
	}
	return u.Items(ctx, &v1.ItemsRequest{Page: req.Page, PageSize: req.PageSize, Sort: req.Sort, Direction: req.Direction})
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.ItemServiceServer = (*ItemServiceImpl)(nil)