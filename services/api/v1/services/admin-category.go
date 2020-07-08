package services

import (
	"context"
	//"github.com/davecgh/go-spew/spew"
	"strconv"
	"strings"

	"github.com/golang/protobuf/ptypes/empty"

	v1 "gcms/api/v1"
	"gcms/models"
	"gcms/packages/auth"
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

func childCategoriesIDs(user_id uint32, categoryID uint32) []uint32 {
	categoriesIDs := []uint32{}
	categories := []models.Category{}
	//db.DB.Where("user_id = ? AND parent = ?", user_id, categoryID).Find(&categories)
	for _, category := range categories {
		categoriesIDs = append(categoriesIDs, category.ID)
		childCategoriesIDs := childCategoriesIDs(user_id, category.ID)
		categoriesIDs = append(categoriesIDs, childCategoriesIDs...)
	}
	return categoriesIDs
}

func (s *AdminCategoryServiceImpl) AdminCategory(ctx context.Context, req *v1.AdminCategoryRequest) (*v1.AdminCategoryResponse, error) {
	//user_id := auth.GetUserUID(ctx)

	category := models.Category{}
	// if db.DB.Where("user_id = ? AND alias = ?", user_id, req.Alias).First(&category).RecordNotFound() {
	// 	return nil, status.Errorf(codes.NotFound, "Category not found")
	// }
	return &v1.AdminCategoryResponse{Category: models.AdminCategoryToResponse(category)}, nil
}

func (s *AdminCategoryServiceImpl) AdminEditCategory(ctx context.Context, req *v1.AdminEditCategoryRequest) (*v1.AdminCategoryResponse, error) {
	//user_id := auth.GetUserUID(ctx)
	category := models.Category{}
	// if db.DB.Where("user_id = ? AND alias = ?", user_id, req.OldAlias).First(&category).RecordNotFound() {
	// 	return nil, status.Errorf(codes.NotFound, "Category not found")
	// }

	category.Title = req.Title
	category.Alias = req.Alias
	category.Description = req.Description
	// if db.DB.Save(&category).Error != nil {
	// 	return nil, status.Errorf(codes.Aborted, "Error save category")
	// }

	if req.Image != "" {
		//directory := config.AppConfig.UploadPath + "/categories/" + strconv.Itoa(int(category.ID)) + "/"
		//file, err := upload.UploadImage(req.Image, directory, "category", config.AppConfig.CategoryThumbSize)
		// if err == nil {
		// 	category.Image = *file
		// 	db.DB.Save(&category)
		// }
	}
	return &v1.AdminCategoryResponse{Category: models.AdminCategoryToResponse(category)}, nil
}

func (s *AdminCategoryServiceImpl) AdminUploadCategory(ctx context.Context, req *v1.AdminUploadCategoryRequest) (*v1.AdminCategoryResponse, error) {
	user_id := auth.GetUserUID(ctx)

	parentCategory := models.Category{}
	// if db.DB.Where("user_id =? && parent = ?", user_id, "#").First(&parentCategory).RecordNotFound() {
	// 	parentCategory.UserID = user_id
	// 	parentCategory.Parent = "#"
	// 	parentCategory.Title = "Categories"
	// 	parentCategory.Alias = strconv.Itoa(int(user_id)) + "_categories"
	// 	parentCategory.Description = "Main category"
	// 	db.DB.Create(&parentCategory)
	// }

	category := models.Category{}
	alias := utils.Translit(strings.ToLower(req.Title))
	//db.DB.Where("user_id = ? AND alias = ?", user_id, alias).First(&category)

	category.UserID = user_id
	category.Title = req.Title
	category.Alias = alias
	if req.ParentId == 0 {
		category.Parent = strconv.Itoa(int(parentCategory.ID))
	} else {
		category.Parent = strconv.Itoa(int(req.ParentId))
	}
	// if db.DB.Save(&category).Error != nil {
	// 	return nil, status.Errorf(codes.Aborted, "Error save category")
	// }
	return &v1.AdminCategoryResponse{Category: models.AdminCategoryToResponse(category)}, nil
}

func (s *AdminCategoryServiceImpl) AdminCategories(ctx context.Context, req *empty.Empty) (*v1.AdminCategoriesResponse, error) {
	//user_id := auth.GetUserUID(ctx)

	//parentCategory := models.Category{}
	// if db.DB.Where("user_id =? && parent = ?", user_id, "#").First(&parentCategory).RecordNotFound() {
	// 	parentCategory.UserID = user_id
	// 	parentCategory.Parent = "#"
	// 	parentCategory.Title = "Categories"
	// 	parentCategory.Alias = strconv.Itoa(int(user_id)) + "_categories"
	// 	parentCategory.Description = "Main category"
	// 	db.DB.Create(&parentCategory)
	// }

	categories := []models.Category{}
	//db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)
	return &v1.AdminCategoriesResponse{Categories: models.AdminCategoriesToResponse(categories)}, nil
}

func (s *AdminCategoryServiceImpl) AdminAddCategory(ctx context.Context, req *v1.AdminAddCategoryRequest) (*v1.AdminCategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	//parent := models.Category{}
	// if db.DB.Where("user_id = ? AND id = ?", user_id, req.Parent).First(&parent).RecordNotFound() {
	// 	return nil, status.Errorf(codes.NotFound, "Parent category not found")
	// }
	category := models.Category{}
	category.UserID = user_id
	category.Title = req.Text
	category.Parent = req.Parent

	//last_category := models.Category{}
	// if db.DB.Where("user_id = ? AND parent = ?", user_id, req.Parent).Order("sort DESC").First(&last_category).RecordNotFound() {
	// 	category.Sort = 0
	// } else {
	// 	category.Sort = last_category.Sort + 1
	// }
	// if db.DB.Save(&category).Error != nil {
	// 	return nil, status.Errorf(codes.Aborted, "Error create category")
	// }
	// category.Alias = strconv.Itoa(int(category.ID)) + "-" + utils.Translit(strings.ToLower(req.Text))
	// if db.DB.Save(&category).Error != nil {
	// 	return nil, status.Errorf(codes.Aborted, "Error create category")
	// }

	categories := []models.Category{}
	//db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)
	return &v1.AdminCategoriesResponse{Categories: models.AdminCategoriesToResponse(categories)}, nil
}

func (s *AdminCategoryServiceImpl) AdminAddCategoryBefore(ctx context.Context, req *v1.AdminAddCategoryRequest) (*v1.AdminCategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	before := models.Category{}
	// if db.DB.Where("user_id = ?", user_id).First(&before, req.Parent).RecordNotFound() {
	// 	return nil, status.Errorf(codes.NotFound, "Before node not found")
	// }
	//afters := []models.Category{}
	// db.DB.Where("user_id = ? AND parent = ? AND sort >= ?", user_id, before.Parent, before.Sort).Find(&afters)
	// for _, after := range afters {
	// 	after.Sort = after.Sort + 1
	// 	db.DB.Save(&after)
	// }

	category := models.Category{}
	category.UserID = user_id
	category.Title = req.Text
	category.Parent = before.Parent
	category.Sort = before.Sort
	// if db.DB.Save(&category).Error != nil {
	// 	return nil, status.Errorf(codes.Aborted, "Error create category")
	// }
	category.Alias = strconv.Itoa(int(category.ID)) + "-" + utils.Translit(strings.ToLower(req.Text))
	// if db.DB.Save(&category).Error != nil {
	// 	return nil, status.Errorf(codes.Aborted, "Error create category")
	// }

	categories := []models.Category{}
	//db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)
	return &v1.AdminCategoriesResponse{Categories: models.AdminCategoriesToResponse(categories)}, nil
}

func (s *AdminCategoryServiceImpl) AdminAddCategoryAfter(ctx context.Context, req *v1.AdminAddCategoryRequest) (*v1.AdminCategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	after := models.Category{}
	// if db.DB.Where("user_id = ?", user_id).First(&after, req.Parent).RecordNotFound() {
	// 	return nil, status.Errorf(codes.NotFound, "After node not found")
	// }
	//afters := []models.Category{}
	// db.DB.Where("user_id = ? AND parent = ? AND sort > ?", user_id, after.Parent, after.Sort).Find(&afters)
	// for _, after := range afters {
	// 	after.Sort = after.Sort + 1
	// 	db.DB.Save(&after)
	// }

	category := models.Category{}
	category.UserID = user_id
	category.Title = req.Text
	category.Parent = after.Parent
	category.Sort = after.Sort + 1
	// if db.DB.Save(&category).Error != nil {
	// 	return nil, status.Errorf(codes.Aborted, "Error create category")
	// }
	// category.Alias = strconv.Itoa(int(category.ID)) + "-" + utils.Translit(strings.ToLower(req.Text))
	// if db.DB.Save(&category).Error != nil {
	// 	return nil, status.Errorf(codes.Aborted, "Error create category")
	// }

	categories := []models.Category{}
	//db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)
	return &v1.AdminCategoriesResponse{Categories: models.AdminCategoriesToResponse(categories)}, nil
}

func (s *AdminCategoryServiceImpl) AdminMoveCategory(ctx context.Context, req *v1.AdminMoveCategoryRequest) (*v1.AdminCategoriesResponse, error) {
	//user_id := auth.GetUserUID(ctx)

	parent := models.Category{}
	// if db.DB.Where("user_id = ?", user_id).First(&parent, parent).RecordNotFound() {
	// 	return nil, status.Errorf(codes.Aborted, "Error move category")
	// }
	category := models.Category{}
	// if db.DB.Where("user_id = ?", user_id).First(&category, req.Id).RecordNotFound() {
	// 	return nil, status.Errorf(codes.Aborted, "Error move category")
	// }
	children := []models.Category{}
	// db.DB.Where("user_id = ? AND parent = ? AND id <> ?", user_id, req.Parent, req.Id).Order("sort").Find(&children)
	for i, child := range children {
		if i < int(req.Position) {
			child.Sort = i
		} else {
			child.Sort = i + 1
		}
		//db.DB.Save(&child)
	}
	category.Sort = int(req.Position)
	if req.Parent != "#" {
		category.Parent = req.Parent
	} else {
		category.Parent = strconv.Itoa(int(parent.ID))
	}
	// if db.DB.Save(&category).Error != nil {

	// 	return nil, status.Errorf(codes.Aborted, "Error move category")
	// }
	categories := []models.Category{}
	//db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)
	return &v1.AdminCategoriesResponse{Categories: models.AdminCategoriesToResponse(categories)}, nil
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
