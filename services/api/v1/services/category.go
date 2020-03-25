package services

import (
	"context"
	"github.com/davecgh/go-spew/spew"
	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"os"
	"strconv"
	"strings"

	v1 "../../../api/v1"
	"../../../config"
	"../../../db"
	"../../../models"
	"../../../packages/auth"
	"../../../packages/utils"
)

type CategoryServiceImpl struct {
}

type CategoryListItem struct {
	ID      uint
	Title   string
	Alias   string
	Level   uint
	Image   string
	Options []CategoryListItem
}

/*
func addCategoryChildrenList(category models.Category, list CategoryListItem) []CategoryListItem {
	level := list.Level

	children := []models.Category{}
	db.DB.Where("parent = ?", category.CategoryID).Order("sort").Find(&children)

	for _, child := range children {
		item := CategoryListItem{}
		item.ID = child.ID
		item.CategoryID = child.CategoryID
		item.Level = level + 1
		item.Image = child.Image
		item.Title = child.Title
		item.Alias = child.Alias
		item.Options = addCategoryChildrenList(child, item)
		list.Options = append(list.Options, item)
	}
	return list.Options
}
*/

func (u *CategoryServiceImpl) Category(ctx context.Context, req *v1.CategoryRequest) (*v1.CategoryResponse, error) {
	user_id := auth.GetUserUID(ctx)

	category := models.Category{}
	if db.DB.Where("user_id = ? AND alias = ?", user_id, req.Alias).First(&category).RecordNotFound() {
		return nil, status.Errorf(codes.InvalidArgument, "Category not found")
	}
	return &v1.CategoryResponse{Category: models.CategoryToResponse(category)}, nil
}

func (u *CategoryServiceImpl) EditCategory(ctx context.Context, req *v1.EditCategoryRequest) (*v1.CategoryResponse, error) {
	spew.Dump(req)
	user_id := auth.GetUserUID(ctx)
	category := models.Category{}
	if db.DB.Where("user_id = ? AND alias = ?", user_id, req.OldAlias).First(&category).RecordNotFound() {
		return nil, status.Errorf(codes.InvalidArgument, "Category not found")
	}

	category.Title = req.Title
	category.Alias = req.Alias
	category.Description = req.Description
	if db.DB.Save(&category).Error != nil {
		return nil, status.Errorf(codes.Aborted, "Error save category")
	}

	if req.Image != "" {
		directory := config.AppConfig.UploadPath + "/categories/" + strconv.Itoa(int(category.ID))
		os.RemoveAll(directory)
		os.MkdirAll(directory, 0775)
		//args.Image.WriteFile(directory + "/" + args.Image.FileName)
		//category.Image = strconv.Itoa(int(category.ID)) + "/" + req.Image
		db.DB.Save(&category)
	}
	return &v1.CategoryResponse{Category: models.CategoryToResponse(category)}, nil
}

func (u *CategoryServiceImpl) Categories(ctx context.Context, req *empty.Empty) (*v1.CategoriesResponse, error) {
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

func (u *CategoryServiceImpl) AddCategory(ctx context.Context, req *v1.AddCategoryRequest) (*v1.CategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	parent := models.Category{}
	if db.DB.Where("user_id = ? AND id = ?", user_id, req.Parent).First(&parent).RecordNotFound() {
		return nil, status.Errorf(codes.InvalidArgument, "Parent category not found")
	}
	category := models.Category{}
	category.UserID = user_id
	category.Title = req.Text
	category.Parent = req.Parent

	last_category := models.Category{}
	if db.DB.Where("user_id = ? AND parent = ?", user_id, req.Parent).Order("sort DESC").First(&last_category).RecordNotFound() {
		category.Sort = 0
	} else {
		category.Sort = last_category.Sort + 1
	}
	if db.DB.Save(&category).Error != nil {
		return nil, status.Errorf(codes.Aborted, "Error create category")
	}
	category.Alias = strconv.Itoa(int(category.ID)) + "-" + utils.Translit(strings.ToLower(req.Text))
	if db.DB.Save(&category).Error != nil {
		return nil, status.Errorf(codes.Aborted, "Error create category")
	}

	categories := []models.Category{}
	db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)
	return &v1.CategoriesResponse{Categories: models.CategoriesToResponse(categories)}, nil
}

func (u *CategoryServiceImpl) AddCategoryBefore(ctx context.Context, req *v1.AddCategoryRequest) (*v1.CategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	before := models.Category{}
	if db.DB.Where("user_id = ?", user_id).First(&before, req.Parent).RecordNotFound() {
		return nil, status.Errorf(codes.Aborted, "Before node not found")
	}
	afters := []models.Category{}
	db.DB.Where("user_id = ? AND parent = ? AND sort >= ?", user_id, before.Parent, before.Sort).Find(&afters)
	for _, after := range afters {
		after.Sort = after.Sort + 1
		db.DB.Save(&after)
	}

	category := models.Category{}
	category.UserID = user_id
	category.Title = req.Text
	category.Parent = before.Parent
	category.Sort = before.Sort
	if db.DB.Save(&category).Error != nil {
		return nil, status.Errorf(codes.Aborted, "Error create category")
	}
	category.Alias = strconv.Itoa(int(category.ID)) + "-" + utils.Translit(strings.ToLower(req.Text))
	if db.DB.Save(&category).Error != nil {
		return nil, status.Errorf(codes.Aborted, "Error create category")
	}

	categories := []models.Category{}
	db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)
	return &v1.CategoriesResponse{Categories: models.CategoriesToResponse(categories)}, nil
}

func (u *CategoryServiceImpl) AddCategoryAfter(ctx context.Context, req *v1.AddCategoryRequest) (*v1.CategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	after := models.Category{}
	if db.DB.Where("user_id = ?", user_id).First(&after, req.Parent).RecordNotFound() {
		return nil, status.Errorf(codes.Aborted, "After node not found")
	}
	afters := []models.Category{}
	db.DB.Where("user_id = ? AND parent = ? AND sort > ?", user_id, after.Parent, after.Sort).Find(&afters)
	for _, after := range afters {
		after.Sort = after.Sort + 1
		db.DB.Save(&after)
	}

	category := models.Category{}
	category.UserID = user_id
	category.Title = req.Text
	category.Parent = after.Parent
	category.Sort = after.Sort + 1
	if db.DB.Save(&category).Error != nil {
		return nil, status.Errorf(codes.Aborted, "Error create category")
	}
	category.Alias = strconv.Itoa(int(category.ID)) + "-" + utils.Translit(strings.ToLower(req.Text))
	if db.DB.Save(&category).Error != nil {
		return nil, status.Errorf(codes.Aborted, "Error create category")
	}

	categories := []models.Category{}
	db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)
	return &v1.CategoriesResponse{Categories: models.CategoriesToResponse(categories)}, nil
}

func (u *CategoryServiceImpl) MoveCategory(ctx context.Context, req *v1.MoveCategoryRequest) (*v1.CategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	parent := models.Category{}
	if db.DB.Where("user_id = ?", user_id).First(&parent, parent).RecordNotFound() {
		return nil, status.Errorf(codes.Aborted, "Error move category")
	}
	category := models.Category{}
	if db.DB.Where("user_id = ?", user_id).First(&category, req.Id).RecordNotFound() {
		return nil, status.Errorf(codes.Aborted, "Error move category")
	}
	children := []models.Category{}
	db.DB.Where("user_id = ? AND parent = ? AND id <> ?", user_id, req.Parent, req.Id).Order("sort").Find(&children)
	for i, child := range children {
		if i < int(req.Position) {
			child.Sort = i
		} else {
			child.Sort = i + 1
		}
		db.DB.Save(&child)
	}
	category.Sort = int(req.Position)
	if req.Parent != "#" {
		category.Parent = req.Parent
	} else {
		category.Parent = strconv.Itoa(int(parent.ID))
	}
	if db.DB.Save(&category).Error != nil {

		return nil, status.Errorf(codes.Aborted, "Error move category")
	}
	categories := []models.Category{}
	db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)
	return &v1.CategoriesResponse{Categories: models.CategoriesToResponse(categories)}, nil
}

func deleteCategory(user_id uint, category models.Category) {
	parent_id := category.ID
	children := []models.Category{}
	db.DB.Where("user_id = ? AND parent = ?", user_id, parent_id).Find(&children)
	for _, child := range children {
		deleteCategory(user_id, child)
	}
	if db.DB.Unscoped().Delete(category).Error == nil {
		//properties_categories := []models.PropertiesCategories{}
		//	db.DB.Where("category_id =", id).Find(&properties_categories)
		//for _, properties_category := range properties_categories {
		//db.DB.Unscoped().Delete(&properties_category)
	}
}

func (u *CategoryServiceImpl) DeleteCategory(ctx context.Context, req *v1.DeleteCategoryRequest) (*v1.CategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	category := models.Category{}
	if db.DB.Where("user_id = ?", user_id).First(&category, req.Id).RecordNotFound() {
		return nil, status.Errorf(codes.Aborted, "Category not found")
	}
	deleteCategory(user_id, category)

	categories := []models.Category{}
	db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)
	return &v1.CategoriesResponse{Categories: models.CategoriesToResponse(categories)}, nil
}

/*
func (u *CategoryServiceImpl) CategoriesList(ctx context.Context) (*types.CategoriesList, error) {
	categories := []models.Category{}
	var list []CategoryListItem
	db.DB.Where("parent = 1").Order("sort").Find(&categories)
	for _, category := range categories {
		item := CategoryListItem{}
		item.ID = category.ID
		item.CategoryID = category.CategoryID
		item.Title = category.Title
		item.Alias = category.Alias
		item.Level = 0
		item.Image = category.Image
		item.Options = addCategoryChildrenList(category, item)
		list = append(list, item)
	}

	data, err := json.Marshal(list)
	if err != nil {
		return nil, errors.New("Categories_list_error")
	}

	return types.GetCategoriesList(string(data)), nil
}

func (u *CategoryServiceImpl) PropertyCategories(ctx context.Context, args struct {
	ID int32
}) (*[]*types.Category, error) {

	id := args.ID

	property := models.Property{}
	db.DB.First(&property, id)

	categories := []models.Category{}
	db.DB.Model(&property).Related(&categories, "Categories")
	var cat []uint
	for _, category := range categories {
		cat = append(cat, category.ID)
	}

	categories = []models.Category{}
	db.DB.Order("sort").Find(&categories)

	for i, category := range categories {
		if utils.HasElement(cat, category.ID) {
			categories[i].Selected = true
		} else {
			categories[i].Selected = false
		}

		if category.ID == 1 {
			categories[i].Opened = true
		} else {
			categories[i].Opened = false
		}
	}
	return types.GetCategories(categories), nil
}
*/

// compile-type check that our new type provides the
// correct server interface
var _ v1.CategoryServiceServer = (*CategoryServiceImpl)(nil)
