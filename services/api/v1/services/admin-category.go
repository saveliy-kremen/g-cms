package services

import (
	"context"
	"strconv"
	"strings"

	"github.com/golang/protobuf/ptypes/empty"
	"github.com/jackc/pgx/v4"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	v1 "gcms/api/v1"
	"gcms/config"
	"gcms/db"
	"gcms/models"
	"gcms/packages/auth"
	"gcms/packages/upload"
	"gcms/packages/utils"
)

type AdminCategoryServiceImpl struct {
}

type CategoryListItem struct {
	ID      uint
	Title   string
	Alias   string
	Level   uint
	Image   string
	Options []CategoryListItem
}

func childCategoriesIDs(ctx context.Context, user_id uint32, categoryID uint32) []uint32 {
	categoriesIDs := []uint32{}

	rows, err := db.DB.Query(ctx,
		`SELECT categories.id
		FROM categories
		WHERE (categories.user_id = $1 AND categories.parent = $2)
		ORDER BY categories.title ASC`,
		user_id, categoryID)
	if err != nil {
		logger.Error(err.Error())
	}
	defer rows.Close()
	for rows.Next() {
		var id uint32
		err := rows.Scan(&categoryID)
		if err != nil {
			logger.Error(err.Error())
		}
		categoriesIDs = append(categoriesIDs, id)
		childCategoriesIDs := childCategoriesIDs(ctx, user_id, id)
		categoriesIDs = append(categoriesIDs, childCategoriesIDs...)
	}
	if err = rows.Err(); err != nil {
		logger.Error(err.Error())
	}
	return categoriesIDs
}

func (s *AdminCategoryServiceImpl) AdminCategory(ctx context.Context, req *v1.AdminCategoryRequest) (*v1.AdminCategoryResponse, error) {
	user_id := auth.GetUserUID(ctx)

	category := models.Category{}
	row := db.DB.QueryRow(ctx,
		`SELECT categories.id, categories.created_at, categories.user_id, categories.title,
			categories.alias, categories.description, categories.image, categories.parent,
			categories.sort, categories.disabled, categories.seo_title, categories.seo_description,
			categories.seo_keywords
		FROM categories
		WHERE items.user_id = $1 AND alias = $2`,
		user_id, req.Alias)
	err := row.Scan(&category.ID, &category.CreatedAt, &category.UserID, &category.Title,
		&category.Alias, &category.Description, &category.Image, &category.Parent, &category.Sort,
		&category.Disabled, &category.SeoTitle, &category.SeoDescription, &category.SeoKeywords)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Category not found")
	}

	return &v1.AdminCategoryResponse{Category: models.AdminCategoryToResponse(category)}, nil
}

func (s *AdminCategoryServiceImpl) AdminEditCategory(ctx context.Context, req *v1.AdminEditCategoryRequest) (*v1.AdminCategoryResponse, error) {
	user_id := auth.GetUserUID(ctx)

	var id uint32
	err := db.DB.QueryRow(ctx,
		`SELECT id FROM categories
		WHERE user_id = $1 AND alias = $2`,
		user_id, req.OldAlias).Scan(&id)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Category not found")
	}

	_, err = db.DB.Exec(ctx, `
    UPDATE categories SET title = $1, alias = $2, description = $3
    WHERE user_id = $4 AND id = $5`,
		req.Title, req.Alias, req.Description, user_id, id)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.Aborted, "Error save category")
	}

	if req.Image != "" {
		directory := config.AppConfig.UploadPath + "/categories/" + strconv.Itoa(int(id)) + "/"
		file, err := upload.UploadImage(req.Image, directory, "category", config.AppConfig.CategoryThumbSize)
		if err == nil {
			_, err = db.DB.Exec(ctx, `
        UPDATE categories SET image = $1
        WHERE user_id = $2 AND id = $3`,
				*file, user_id, id)
		} else {
			logger.Error(err.Error())
		}
	}

	return s.AdminCategory(ctx, &v1.AdminCategoryRequest{Alias: req.Alias})
}

func (s *AdminCategoryServiceImpl) AdminUploadCategory(ctx context.Context, req *v1.AdminUploadCategoryRequest) (*v1.AdminCategoryResponse, error) {
	user_id := auth.GetUserUID(ctx)

	var parentID uint32
	err := db.DB.QueryRow(ctx,
		`SELECT id FROM categories
		WHERE user_id = $1 AND parent = $2`,
		user_id, "#").Scan(&parentID)
	if err != nil && err == pgx.ErrNoRows {
		err := db.DB.QueryRow(ctx, `
		INSERT INTO categories (user_id, parent, title, alias, description)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id
		`,
			user_id, "#", "Categories", strconv.Itoa(int(user_id))+"_categories", "Main category").
			Scan(&parentID)
		if err != nil {
			return nil, status.Errorf(codes.Aborted, "Error create item")
		}
	}

	alias := utils.Translit(strings.ToLower(req.Title))
	categoryParent := strconv.Itoa(int(parentID))
	if req.ParentId != 0 {
		categoryParent = strconv.Itoa(int(req.ParentId))
	}

	var id uint32
	err = db.DB.QueryRow(ctx,
		`SELECT id FROM categories
		WHERE user_id = $1 AND alias = $2`,
		user_id, alias).Scan(&id)
	if err == nil {
		_, err = db.DB.Exec(ctx, `
    UPDATE categories SET  title = $1, alias = $2, parent = $3
    WHERE user_id = $4 AND id = $5`,
			req.Title, alias, categoryParent, user_id, id)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.Aborted, "Error save category")
		}
	} else if err == pgx.ErrNoRows {
		err := db.DB.QueryRow(ctx, `
		INSERT INTO categories (user_id, title, alias, parent)
		VALUES ($1, $2, $3, $4)`,
			user_id, req.Title, alias, categoryParent)
		if err != nil {
			return nil, status.Errorf(codes.Aborted, "Error create category")
		}
	} else {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.Aborted, "Error save category")
	}

	return s.AdminCategory(ctx, &v1.AdminCategoryRequest{Alias: alias})
}

func (s *AdminCategoryServiceImpl) AdminCategories(ctx context.Context, req *empty.Empty) (*v1.AdminCategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	var parentID uint32
	err := db.DB.QueryRow(ctx,
		`SELECT id FROM categories
		WHERE user_id = $1 AND parent = $2`,
		user_id, "#").Scan(&parentID)
	if err != nil && err == pgx.ErrNoRows {
		err := db.DB.QueryRow(ctx, `
		INSERT INTO categories (user_id, parent, title, alias, description)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id
		`,
			user_id, "#", "Categories", strconv.Itoa(int(user_id))+"_categories", "Main category").
			Scan(&parentID)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.Aborted, "Error create item")
		}
	}

	categories := []models.Category{}
	rows, err := db.DB.Query(ctx, `
    SELECT categories.id, categories.created_at, categories.user_id, categories.title,
    categories.alias, categories.description, categories.image, categories.parent,
    categories.sort, categories.disabled, categories.seo_title, categories.seo_description,
    categories.seo_keywords
    FROM categories
    WHERE (categories.user_id = $1)
    ORDER BY categories.sort ASC`, user_id)
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

	return &v1.AdminCategoriesResponse{Categories: models.AdminCategoriesToResponse(categories)}, nil
}

func (s *AdminCategoryServiceImpl) AdminAddCategory(ctx context.Context, req *v1.AdminAddCategoryRequest) (*v1.AdminCategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	var exists bool
	err := db.DB.QueryRow(ctx, `
    SELECT EXISTS(SELECT 1 FROM categories WHERE user_id = $1 AND id = $2)`,
		user_id, req.Parent).Scan(&exists)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Parent category not found")
	}

	var sort int
	categorySort := 0
	err = db.DB.QueryRow(ctx, `
    SELECT  sort FROM categories WHERE user_id = $1 AND parent = $2)`,
		user_id, req.Parent).Scan(&sort)
	if err == nil {
		categorySort = sort + 1
	}

	var id int
	err = db.DB.QueryRow(ctx, `
  INSERT INTO categories (user_id, title, parent, alias, sort)
  VALUES ($1, $2, $3, '', $4)
  RETURNING id
  `,
		user_id, req.Text, req.Parent, categorySort).
		Scan(&id)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.Aborted, "Error create category")
	}

	_, err = db.DB.Exec(ctx, `
    UPDATE categories SET alias = $1
    WHERE id = $2`,
		strconv.Itoa(id)+"-"+utils.Translit(strings.ToLower(req.Text)), id)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.Aborted, "Error save category")
	}

	return s.AdminCategories(ctx, nil)
}

func (s *AdminCategoryServiceImpl) AdminAddCategoryBefore(ctx context.Context, req *v1.AdminAddCategoryRequest) (*v1.AdminCategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	var (
		parent string
		sort   int
	)
	err := db.DB.QueryRow(ctx, `
    SELECT parent, sort
    FROM categories WHERE user_id = $1 AND id = $2`,
		user_id, req.Parent).Scan(&parent, &sort)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Before node not found")
	}

	_, err = db.DB.Exec(ctx, `
    UPDATE categories 
    SET sort = sort + 1
    WHERE user_id = $1 AND parent = $2 AND sort >= $3`,
		user_id, parent, sort)
	if err != nil {
		logger.Error(err.Error())
	}

	categorySort := 0
	err = db.DB.QueryRow(ctx, `
    SELECT  sort FROM categories WHERE user_id = $1 AND parent = $2)`,
		user_id, req.Parent).Scan(&sort)
	if err == nil {
		categorySort = sort + 1
	}

	var id int
	err = db.DB.QueryRow(ctx, `
    INSERT INTO categories (user_id, title, parent, alias, sort)
    VALUES ($1, $2, $3, '', $4)
    RETURNING id
  `,
		user_id, req.Text, parent, categorySort).
		Scan(&id)
	if err != nil {
		return nil, status.Errorf(codes.Aborted, "Error create category")
	}

	_, err = db.DB.Exec(ctx, `
    UPDATE categories SET alias = $1
    WHERE id = $2`,
		strconv.Itoa(id)+"-"+utils.Translit(strings.ToLower(req.Text)), id)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.Aborted, "Error save category")
	}

	return s.AdminCategories(ctx, nil)
}

func (s *AdminCategoryServiceImpl) AdminAddCategoryAfter(ctx context.Context, req *v1.AdminAddCategoryRequest) (*v1.AdminCategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	var (
		parent string
		sort   int
	)
	err := db.DB.QueryRow(ctx, `
    SELECT parent, sort
    FROM categories WHERE user_id = $1 AND id = $2`,
		user_id, req.Parent).Scan(&parent, &sort)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "After node not found")
	}

	_, err = db.DB.Exec(ctx, `
    UPDATE categories 
    SET sort = sort + 1
    WHERE user_id = $1 AND parent = $2 AND sort > $3`,
		user_id, parent, sort)
	if err != nil {
		logger.Error(err.Error())
	}

	var id int
	err = db.DB.QueryRow(ctx, `
	INSERT INTO categories (user_id, title, parent, alias, sort)
	VALUES ($1, $2, $3, '', $4)
	RETURNING id`,
		user_id, req.Text, parent, sort+1).
		Scan(&id)
	if err != nil {
		return nil, status.Errorf(codes.Aborted, "Error create category")
	}

	_, err = db.DB.Exec(ctx, `
    UPDATE categories SET alias = $1
    WHERE id = $2`,
		strconv.Itoa(id)+"-"+utils.Translit(strings.ToLower(req.Text)), id)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.Aborted, "Error save category")
	}

	return s.AdminCategories(ctx, nil)
}

func (s *AdminCategoryServiceImpl) AdminMoveCategory(ctx context.Context, req *v1.AdminMoveCategoryRequest) (*v1.AdminCategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	var parentID uint32
	err := db.DB.QueryRow(ctx,
		`SELECT id FROM categories
		WHERE user_id = $1 AND id = $2`,
		user_id, req.Parent).Scan(&parentID)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.Aborted, "Error move category")
	}

	tx, err := db.DB.Begin(ctx)

	var categoryID uint32
	err = db.DB.QueryRow(ctx,
		`SELECT id FROM categories
		WHERE user_id = $1 AND id = $2`,
		user_id, req.Id).Scan(&categoryID)
	if err != nil {
		logger.Error(err.Error())
		tx.Rollback(ctx)
		return nil, status.Errorf(codes.Aborted, "Error move category")
	}

	_, err = db.DB.Exec(ctx, `
	UPDATE categories 
	SET sort = a.row_number
	FROM (
		   SELECT id, row_number() over ()
		   FROM categories
		   WHERE user_id = $1 AND parent = $2 AND id <> $3 AND sort < $4
		   ORDER BY sort
		 ) a
    WHERE categories.id = a.id AND user_id = $1 AND parent = $2 AND categories.id <> $3 AND categories.sort < $4`,
		user_id, req.Parent, req.Id, req.Position+1)
	if err != nil {
		logger.Error(err.Error())
	}

	_, err = db.DB.Exec(ctx, `
    UPDATE categories 
	SET sort = a.row_number + $4
	FROM (
		   SELECT id, row_number() over ()
		   FROM categories
		   WHERE user_id = $1 AND parent = $2 AND id <> $3 AND sort >= $4
		   ORDER BY sort
		 ) a
    WHERE categories.id = a.id AND user_id = $1 AND parent = $2 AND categories.id <> $3 AND categories.sort >= $4`,
		user_id, req.Parent, req.Id, req.Position+1)
	if err != nil {
		logger.Error(err.Error())
	}

	categoryParent := strconv.Itoa(int(parentID))
	if req.Parent != "#" {
		categoryParent = req.Parent
	}
	_, err = db.DB.Exec(ctx, `
    UPDATE categories 
    SET sort = $1, parent = $2
    WHERE user_id = $3 AND id = $4`,
		req.Position+1, categoryParent, user_id, categoryID)
	if err != nil {
		logger.Error(err.Error())
		tx.Rollback(ctx)
		return nil, status.Errorf(codes.Aborted, "Error move category")
	}

	rows, err := db.DB.Query(ctx, `
  SELECT id
  FROM categories
  WHERE user_id = $1 AND parent = $2
  ORDER BY sort`, user_id, req.Parent)
	if err != nil {
		logger.Error(err.Error())
	}
	defer rows.Close()
	num := 1
	for rows.Next() {
		var id int
		err := rows.Scan(&id)
		if err != nil {
			logger.Error(err.Error())
		}
		_, err = db.DB.Exec(ctx, `
      UPDATE categories
      SET sort = $1
      WHERE user_id = $2 AND id = $3`,
			num, user_id, id)
		if err != nil {
			logger.Error(err.Error())
		}
		num++
	}

	tx.Commit(ctx)

	return s.AdminCategories(ctx, nil)
}

func deleteCategory(user_id uint32, category models.Category) {
	//parent_id := category.ID
	children := []models.Category{}
	//db.DB.Where("user_id = ? AND parent = ?", user_id, parent_id).Find(&children)
	for _, child := range children {
		deleteCategory(user_id, child)
	}
	// if db.DB.Unscoped().Delete(category).Error == nil {
	// 	items_categories := []models.ItemsCategories{}
	// 	//db.DB.Where("category_id =", category.ID).Find(&items_categories)
	// 	for _, items_category := range items_categories {
	// 		db.DB.Unscoped().Delete(&items_category)
	// 	}
	// 	properties_categories := []models.PropertiesCategories{}
	// 	//db.DB.Where("category_id =", category.ID).Find(&properties_categories)
	// 	for _, properties_category := range properties_categories {
	// 		db.DB.Unscoped().Delete(&properties_category)
	// 	}
	// }
}

func (s *AdminCategoryServiceImpl) AdminDeleteCategory(ctx context.Context, req *v1.AdminDeleteCategoryRequest) (*v1.AdminCategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	category := models.Category{}
	// if db.DB.Where("user_id = ?", user_id).First(&category, req.Id).RecordNotFound() {
	// 	return nil, status.Errorf(codes.NotFound, "Category not found")
	// }
	deleteCategory(user_id, category)

	categories := []models.Category{}
	//db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)
	return &v1.AdminCategoriesResponse{Categories: models.AdminCategoriesToResponse(categories)}, nil
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.AdminCategoryServiceServer = (*AdminCategoryServiceImpl)(nil)
