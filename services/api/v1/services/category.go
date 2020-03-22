package services

import (
	"context"
	"github.com/golang/protobuf/ptypes/empty"
	//"os"
	"strconv"
	//"strings"

	v1 "../../../api/v1"
	//"../../../config"
	"../../../db"
	"../../../models"
	//"../../../packages/utils"
	"../../../packages/auth"
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

func (u *CategoryServiceImpl) Categories(ctx context.Context, req *empty.Empty) (*v1.CategoriesResponse, error) {
	user := auth.GetUser(ctx)

	parentCategory := models.Category{}
	if db.DB.Where("user_id =? && parent = ?", user.ID, "#").First(&parentCategory).RecordNotFound() {
		parentCategory.UserID = user.ID
		parentCategory.Parent = "#"
		parentCategory.Title = "Categories"
		parentCategory.Alias = "categories_" + strconv.Itoa(int(user.ID))
		parentCategory.Description = "Main category"
		db.DB.Create(&parentCategory)
	}

	categories := []models.Category{}
	db.DB.Where("user_id = ?", user.ID).Order("sort").Find(&categories)

	respCategories := []*v1.Category{}
	for _, category := range categories {
		if category.Parent == "#" {
			category.Opened = true
		} else {
			category.Opened = false
		}
		respCategories = append(respCategories, models.CategoryToResponse(category))
	}

	resp := &v1.CategoriesResponse{Categories: respCategories}
	return resp, nil
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

func (u *CategoryServiceImpl) Category(ctx context.Context, args struct {
	Alias string
}) (*types.Category, error) {

	alias := args.Alias

	category := models.Category{}
	if db.DB.Where("alias = ?", alias).First(&category).RecordNotFound() {
		return nil, errors.New("Category_not_found")
	}
	return types.GetCategory(category), nil
}

func (u *CategoryServiceImpl) AddCategory(ctx context.Context, args struct {
	ID       string
	ParentID string
	Title    string
	Alias    *string
}) (*[]*types.Category, error) {

	id := args.ID
	parent_id := args.ParentID
	title := args.Title
	alias := ""
	if args.Alias != nil {
		alias = *args.Alias
	} else {
		alias = utils.Translit(strings.ToLower(title))
	}

	parent := models.Category{}
	if db.DB.Where("category_id = ?", parent_id).First(&parent).Error == nil {
		category := models.Category{}
		category.CategoryID = id
		category.Title = title
		category.Parent = parent_id
		category.Active = true
		if db.DB.Save(&category).Error != nil {
			return nil, errors.New("Create_category_error")
		}
		last_category := models.Category{}
		if db.DB.Where("parent = ?", parent_id).Order("sort DESC").First(&last_category).RecordNotFound() {
			category.Sort = 0
		} else {
			category.Sort = last_category.Sort + 1
		}

		if db.DB.Save(&category).Error != nil {
			return nil, errors.New("Save_category_error")
		}
		category.Alias = strconv.Itoa(int(category.ID)) + "-" + alias
		db.DB.Save(&category)

	} else {
		return nil, errors.New("Parent_item_not_found")
	}
	return r.Categories(ctx, struct{ ParentID *string }{ParentID: &args.ParentID})
}

func (u *CategoryServiceImpl) AddCategoryBefore(ctx context.Context, args struct {
	ID       string
	BeforeID string
	Title    string
	Alias    *string
}) (*[]*types.Category, error) {

	id := args.ID
	before_id := args.BeforeID
	title := args.Title
	alias := ""
	if args.Alias != nil {
		alias = *args.Alias
	} else {
		alias = utils.Translit(strings.ToLower(title))
	}

	before := models.Category{}
	if !db.DB.Where("category_id = ?", before_id).First(&before).RecordNotFound() {
		afters := []models.Category{}
		db.DB.Where("parent = ? AND sort >= ?", before.Parent, before.Sort).Find(&afters)
		for _, after := range afters {
			after.Sort = after.Sort + 1
			db.DB.Save(&after)
		}

		category := models.Category{}
		category.CategoryID = id
		category.Title = title
		category.Parent = before.Parent
		category.Sort = before.Sort
		category.Active = true
		if db.DB.Save(&category).Error != nil {
			return nil, errors.New("Create_category_error")
		}
		category.Alias = strconv.Itoa(int(category.ID)) + "-" + alias
		db.DB.Save(&category)
	} else {
		return nil, errors.New("Before_node_not_found")
	}
	return r.Categories(ctx, struct{ ParentID *string }{ParentID: &before.Parent})
}

func (u *CategoryServiceImpl) AddCategoryAfter(ctx context.Context, args struct {
	ID      string
	AfterID string
	Title   string
	Alias   *string
}) (*[]*types.Category, error) {

	id := args.ID
	after_id := args.AfterID
	title := args.Title
	alias := ""
	if args.Alias != nil {
		alias = *args.Alias
	} else {
		alias = utils.Translit(strings.ToLower(title))
	}

	after := models.Category{}
	if !db.DB.Where("category_id = ?", after_id).First(&after).RecordNotFound() {
		afters := []models.Category{}
		db.DB.Where("parent = ? AND sort > ?", after.Parent, after.Sort).Find(&afters)
		for _, after := range afters {
			after.Sort = after.Sort + 1
			db.DB.Save(&after)
		}

		category := models.Category{}
		category.CategoryID = id
		category.Title = title
		category.Parent = after.Parent
		category.Sort = after.Sort + 1
		category.Active = true

		if db.DB.Save(&category).Error != nil {
			return nil, errors.New("Create_category_error")
		}
		category.Alias = strconv.Itoa(int(category.ID)) + "-" + alias
		db.DB.Save(&category)
	} else {
		return nil, errors.New("After_node_not_found")
	}
	return r.Categories(ctx, struct{ ParentID *string }{ParentID: &after.Parent})
}

func (u *CategoryServiceImpl) EditCategory(ctx context.Context, args struct {
	Title       string
	Alias       string
	NewAlias    string
	Description *string
	Image       *graphqlupload.GraphQLUpload
}) (*types.Category, error) {

	title := args.Title
	alias := args.Alias
	newAlias := args.NewAlias
	description := ""
	if args.Description != nil {
		description = *args.Description
	}

	category := models.Category{}
	if db.DB.Where("alias = ?", alias).First(&category).RecordNotFound() {
		return nil, errors.New("Category_not found")
	}

	category.Title = title
	category.Alias = newAlias
	category.Description = description
	if db.DB.Save(&category).Error != nil {
		return nil, errors.New("Save_category_error")
	}

	if args.Image != nil {
		directory := config.AppConfig.UploadPath + "/categories/" + strconv.Itoa(int(category.ID))
		os.RemoveAll(directory)
		os.MkdirAll(directory, 0775)
		args.Image.WriteFile(directory + "/" + args.Image.FileName)
		category.Image = strconv.Itoa(int(category.ID)) + "/" + args.Image.FileName
		db.DB.Save(&category)
	}
	return types.GetCategory(category), nil
}

func (u *CategoryServiceImpl) CategoryMoveNode(ctx context.Context, args struct {
	ID       string
	ParentID *string
	Position int32
}) (*[]*types.Category, error) {

	id := args.ID
	parent_id := "1"
	if args.ParentID != nil {
		parent_id = *args.ParentID
	}
	position := args.Position

	parent := models.Category{}
	if !db.DB.Where("category_id = ?", parent_id).First(&parent).RecordNotFound() {
		category := models.Category{}
		if !db.DB.Where("category_id = ?", id).First(&category).RecordNotFound() {
			children := []models.Category{}
			db.DB.Where("parent = ? AND id <> ?", parent_id, category.ID).Order("sort").Find(&children)
			for i, child := range children {
				if i < int(position) {
					child.Sort = i
				} else {
					child.Sort = i + 1
				}
				db.DB.Save(&child)
			}
			category.Sort = int(position)
			if db.DB.Save(&category).Error != nil {
				return nil, errors.New("Error_move_node")
			}
		} else {
			return nil, errors.New("Node_not_found")
		}
	} else {
		return nil, errors.New("Parent_node_not_found")
	}
	return r.Categories(ctx, struct{ ParentID *string }{ParentID: &parent_id})
}

func (r *Resolver) CategoryDelete(ctx context.Context, args struct {
	ID string
}) (*[]*types.Category, error) {

	id := args.ID

	category := models.Category{}
	if !db.DB.Where("category_id = ?", id).First(&category).RecordNotFound() {
		deleteCategory(category)
	} else {
		return nil, errors.New("Node_not_found")
	}
	return r.Categories(ctx, struct{ ParentID *string }{ParentID: &category.Parent})
}

func deleteCategory(category models.Category) {
	parent_id := category.CategoryID
	children := []models.Category{}
	db.DB.Where("parent = ?", parent_id).Find(&children)
	for _, child := range children {
		deleteCategory(child)
	}
	if db.DB.Unscoped().Delete(category).Error == nil {
		//properties_categories := []models.PropertiesCategories{}
		//	db.DB.Where("category_id =", id).Find(&properties_categories)
		//for _, properties_category := range properties_categories {
		//db.DB.Unscoped().Delete(&properties_category)
	}
}
*/

// compile-type check that our new type provides the
// correct server interface
var _ v1.CategoryServiceServer = (*CategoryServiceImpl)(nil)
