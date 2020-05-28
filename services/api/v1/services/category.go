package services

import (
	"context"
	//"github.com/davecgh/go-spew/spew"
	"strconv"

	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	v1 "../../../api/v1"
	"../../../db"
	"../../../models"
	"../../../packages/auth"
)

type CategoryServiceImpl struct {
}

func (s *CategoryServiceImpl) Category(ctx context.Context, req *v1.CategoryRequest) (*v1.CategoryResponse, error) {
	user_id := auth.GetUserUID(ctx)

	category := models.Category{}
	if db.DB.Where("user_id = ? AND alias = ?", user_id, req.Alias).First(&category).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Category not found")
	}
	return &v1.CategoryResponse{Category: models.CategoryToResponse(category)}, nil
}

func (s *CategoryServiceImpl) Categories(ctx context.Context, req *empty.Empty) (*v1.CategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	parentCategory := models.Category{}
	if db.DB.Where("user_id =? && parent = ?", user_id, "#").First(&parentCategory).RecordNotFound() {
		parentCategory.UserID = user_id
		parentCategory.Parent = "#"
		parentCategory.Title = "Categories"
		parentCategory.Alias = strconv.Itoa(int(user_id)) + "_categories"
		parentCategory.Description = "Main category"
		db.DB.Create(&parentCategory)
	}

	categories := []models.Category{}
	db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)
	return &v1.CategoriesResponse{Categories: models.CategoriesToResponse(categories)}, nil
}
