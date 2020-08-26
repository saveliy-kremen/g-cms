package services

import (
	"context"
	//"github.com/davecgh/go-spew/spew"
	"strconv"

	"github.com/golang/protobuf/ptypes/empty"
	"github.com/jackc/pgx/v4"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	v1 "gcms/api/v1"
	"gcms/db"
	"gcms/models"
	"gcms/packages/auth"
)

type CategoryServiceImpl struct {
}

func (s *CategoryServiceImpl) Category(ctx context.Context, req *v1.CategoryRequest) (*v1.CategoryResponse, error) {
	user_id := auth.GetUserUID(ctx)

	category := models.Category{}
	row := db.DB.QueryRow(ctx,
		`SELECT id, created_at, user_id, title,	alias, description, image, parent, sort,
		disabled, seo_title, seo_description, seo_keywords
		FROM categories
		WHERE user_id = $1 AND alias = $2`,
		user_id, req.Alias)
	err := row.Scan(&category.ID, &category.CreatedAt, &category.UserID, &category.Title,
		&category.Alias, &category.Description, &category.Image, &category.Parent, &category.Sort,
		&category.Disabled, &category.SeoTitle, &category.SeoDescription, &category.SeoKeywords)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Category not found")
	}
	return &v1.CategoryResponse{Category: models.CategoryToResponse(category)}, nil
}

func (s *CategoryServiceImpl) Categories(ctx context.Context, req *empty.Empty) (*v1.CategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	parentCategory := models.Category{}
	row := db.DB.QueryRow(ctx,
		`SELECT id
		FROM categories
		WHERE user_id = $1 AND parent = $2`,
		user_id, "#")
	err := row.Scan(&parentCategory.ID)
	if err != nil && err == pgx.ErrNoRows {
		parentCategory.UserID = user_id
		parentCategory.Parent = "#"
		parentCategory.Title = "Categories"
		parentCategory.Alias = strconv.Itoa(int(user_id)) + "_categories"
		parentCategory.Description = "Main category"
		_, err = db.DB.Exec(ctx,
			`INSERT INTO categories (user_id, parent, title, alias, description)
			VALUES($1, $2, $3, $4, $5)`,
			parentCategory.UserID, parentCategory.Parent, parentCategory.Title, parentCategory.Alias,
			parentCategory.Description)
		if err != nil {
			logger.Error(err.Error())
		}
	}

	categories := []models.Category{}
	rows, err := db.DB.Query(ctx, `
	SELECT id, created_at, user_id, title, alias, description, image, parent, sort,
	disabled, seo_title, seo_description, seo_keywords
    FROM categories
    WHERE user_id = $1
	ORDER BY categories.sort ASC`,
		user_id)
	if err != nil {
		return nil, status.Errorf(codes.NotFound, "Categories not found")
	}
	defer rows.Close()
	for rows.Next() {
		category := models.Category{}
		err := rows.Scan(&category.ID, &category.CreatedAt, &category.UserID, &category.Title,
			&category.Alias, &category.Description, &category.Image, &category.Parent, &category.Sort,
			&category.Disabled, &category.SeoTitle, &category.SeoDescription, &category.SeoKeywords)
		if err != nil {
			logger.Error(err.Error())
		}
		categories = append(categories, category)
	}
	if err = rows.Err(); err != nil {
		return nil, status.Errorf(codes.NotFound, "Categories not found")
	}

	return &v1.CategoriesResponse{Categories: models.CategoriesToResponse(categories)}, nil
}
