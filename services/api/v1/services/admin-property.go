package services

import (
	"context"
	"database/sql"
	"fmt"
	"log"

	"os"
	"strconv"
	"strings"

	v1 "gcms/api/v1"
	"gcms/config"
	"gcms/db"
	"gcms/models"
	"gcms/packages/auth"
	"gcms/packages/upload"
	"gcms/packages/utils"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type AdminPropertyServiceImpl struct {
}

func (s *AdminPropertyServiceImpl) AdminProperty(ctx context.Context, req *v1.AdminPropertyRequest) (*v1.AdminPropertyResponse, error) {
	user_id := auth.GetUserUID(ctx)

	property := models.Property{}

	row := db.DB.QueryRow(ctx,
		`SELECT properties.id, properties.user_id, properties.title, properties.code, properties.type,
		properties.display, properties.required, properties.multiple, properties.sort
			FROM properties
			WHERE properties.user_id = $1 AND properties.id = $2`,
		user_id, req.Id)
	err := row.Scan(&property.ID, &property.UserID, &property.Title, &property.Code, &property.Type,
		&property.Display, &property.Required, &property.Multiple, &property.Sort)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Property not found")
	}

	rows, err := db.DB.Query(ctx,
		`SELECT properties_values.id, properties_values.value, properties_values.image,
		properties_values.sort
		FROM properties_values
		WHERE properties_values.user_id = $1 AND properties_values.property_id = $2`,
		user_id, req.Id)
	defer rows.Close()
	for rows.Next() {
		propertyValue := models.PropertyValue{}
		err := rows.Scan(&propertyValue.ID, &propertyValue.Value, &propertyValue.Image, &propertyValue.Sort)
		if err != nil {
			log.Fatal(err)
		}
		property.Values = append(property.Values, propertyValue)
	}
	if err = rows.Err(); err != nil {
		return nil, status.Errorf(codes.NotFound, "Property values set error")
	}
	return &v1.AdminPropertyResponse{Property: models.AdminPropertyToResponse(property)}, nil
}

func (s *AdminPropertyServiceImpl) AdminProperties(ctx context.Context, req *v1.AdminPropertiesRequest) (*v1.AdminPropertiesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	properties := []models.Property{}
	var total uint32

	order := "sort"
	if req.Sort != "" {
		order = req.Sort + " " + req.Direction
	}

	err := db.DB.QueryRow(ctx, "SELECT count(*) FROM properties WHERE user_id = $1", user_id).Scan(&total)
	query := fmt.Sprintf(
		`SELECT properties.id, properties.user_id, properties.title, properties.code, properties.type,
			properties.display, properties.required, properties.multiple, properties.sort
		FROM properties
		WHERE (properties.user_id = $1)
		ORDER BY %s OFFSET $2 LIMIT $3`,
		order)
	rows, err := db.DB.Query(ctx, query, user_id, req.Page*req.PageSize, req.PageSize)
	if err != nil {
		return nil, status.Errorf(codes.NotFound, "Properties not found")
	}
	defer rows.Close()
	for rows.Next() {
		property := models.Property{}
		err := rows.Scan(&property.ID, &property.UserID, &property.Title, &property.Code, &property.Type,
			&property.Display, &property.Required, &property.Multiple, &property.Sort)
		if err != nil {
			logger.Error(err.Error())
		}
		properties = append(properties, property)
	}
	if err = rows.Err(); err != nil {
		logger.Error(err.Error())
	}
	return &v1.AdminPropertiesResponse{Properties: models.AdminPropertiesToResponse(properties), Position: (req.Page * req.PageSize) + 1, Total: total}, nil
}

func (s *AdminPropertyServiceImpl) AdminEditProperty(ctx context.Context, req *v1.AdminEditPropertyRequest) (*v1.AdminPropertyResponse, error) {
	user_id := auth.GetUserUID(ctx)

	property := models.Property{}
	property.UserID = user_id
	property.Title = req.Title
	property.Code = req.Code
	if property.Code == "" {
		property.Code = utils.Translit(strings.ToLower(property.Title))
	}
	property.Type = models.PropertyType(req.Type)
	property.Display = models.PropertyDisplayType(req.Display)
	property.Required = req.Required
	property.Multiple = req.Multiple
	property.Sort = uint(req.Sort)

	var exists bool
	err := db.DB.QueryRow(ctx, "SELECT EXISTS(SELECT 1 FROM properties WHERE user_id = $1 AND code = $2 AND id <> $3)", user_id, property.Code, req.Id).Scan(&exists)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.Aborted, "Property code exist")
	}

	if req.Id != 0 {
		_, err := db.DB.Exec(ctx, `
		UPDATE properties SET title=$1, code=$2, type=$3, display=$4, required=$5, multiple=$6, sort=$7
		WHERE user_id=$8 AND id=$9`,
			property.Title, property.Code, property.Type, property.Display, property.Required, property.Multiple,
			property.Sort, user_id, req.Id)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.NotFound, "Property not found")
		}
		property.ID = uint(req.Id)
	} else {
		err := db.DB.QueryRow(ctx, `
		INSERT INTO properties (user_id, title, code, type, display, required, multiple, sort)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING id
		`,
			property.UserID, property.Title, property.Code, property.Type, property.Display,
			property.Required, property.Multiple, property.Sort).Scan(&property.ID)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.Aborted, "Error create property")
		}
	}
	return &v1.AdminPropertyResponse{Property: models.AdminPropertyToResponse(property)}, nil
}

func (s *AdminPropertyServiceImpl) AdminDeleteProperty(ctx context.Context, req *v1.AdminDeletePropertyRequest) (*v1.AdminPropertiesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	_, err := db.DB.Exec(ctx,
		`DELETE FROM properties
			WHERE user_id = $1 AND id = $2`,
		user_id, req.Id)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.Aborted, "Error delete property")
	}

	directory := config.AppConfig.UploadPath + "/properties/" + strconv.Itoa(int(req.Id))
	os.RemoveAll(directory)

	return s.AdminProperties(ctx, &v1.AdminPropertiesRequest{Page: req.Page, PageSize: req.PageSize, Sort: req.Sort, Direction: req.Direction})
}

func (s *AdminPropertyServiceImpl) AdminPropertyCategories(ctx context.Context, req *v1.AdminPropertyRequest) (*v1.AdminCategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	var exists bool
	if req.Id != 0 {
		err := db.DB.QueryRow(ctx, "SELECT EXISTS(SELECT 1 FROM properties WHERE user_id=$1 AND id=$2)", user_id, req.Id).Scan(&exists)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.NotFound, "Property not found")
		}
	}

	var cat []uint32
	query := fmt.Sprintf(
		`SELECT category_id
		FROM properties_categories
		WHERE (property_id = $1)
		GROUP BY category_id`)
	rows, err := db.DB.Query(ctx, query, req.Id)
	defer rows.Close()
	for rows.Next() {
		var categoryID uint32
		err := rows.Scan(&categoryID)
		if err != nil {
			logger.Error(err.Error())
		}
		cat = append(cat, categoryID)
	}
	if err = rows.Err(); err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Items categories set error")
	}

	categories := []models.Category{}
	query = fmt.Sprintf(
		`SELECT categories.id, categories.created_at, categories.user_id, categories.title,
		categories.alias, categories.description, categories.image, categories.parent,
		categories.sort, categories.disabled, categories.seo_title, categories.seo_description,
		categories.seo_keywords
		FROM categories
		WHERE (categories.user_id = $1)
		ORDER BY categories.title ASC`)
	rows, err = db.DB.Query(ctx, query, user_id)
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
		return nil, status.Errorf(codes.NotFound, "Categories set error")
	}

	for i, category := range categories {
		if utils.HasElement(cat, category.ID) {
			categories[i].Selected = true
		} else {
			categories[i].Selected = false
		}

		if category.Parent == "#" {
			categories[i].Opened = true
		} else {
			categories[i].Opened = false
		}
	}

	return &v1.AdminCategoriesResponse{Categories: models.AdminCategoriesToResponse(categories)}, nil
}

func (s *AdminPropertyServiceImpl) AdminPropertyBindCategory(ctx context.Context, req *v1.AdminPropertyBindRequest) (*v1.AdminCategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	var exists bool
	if req.Id != 0 {
		err := db.DB.QueryRow(ctx, "SELECT EXISTS(SELECT 1 FROM properties WHERE user_id=$1 AND id=$2)", user_id, req.Id).Scan(&exists)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.NotFound, "Property not found")
		}
	}

	if req.Id != 0 {
		err := db.DB.QueryRow(ctx, "SELECT EXISTS(SELECT 1 FROM categories WHERE user_id=$1 AND id=$2)", user_id, req.CategoryId).Scan(&exists)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.NotFound, "Category_not_found")
		}
	}

	_, err := db.DB.Exec(ctx,
		`INSERT INTO properties_categories (user_id, property_id, category_id) VALUES($1, $2, $3)
		ON CONFLICT ON CONSTRAINT properties_categories_pkey 
		DO NOTHING`,
		user_id, req.Id, req.CategoryId)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.Aborted, "Error bind category")
	}

	return s.AdminPropertyCategories(ctx, &v1.AdminPropertyRequest{Id: req.Id})
}

func (s *AdminPropertyServiceImpl) AdminPropertyUnbindCategory(ctx context.Context, req *v1.AdminPropertyBindRequest) (*v1.AdminCategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	var exists bool
	if req.Id != 0 {
		err := db.DB.QueryRow(ctx, "SELECT EXISTS(SELECT 1 FROM properties WHERE user_id=$1 AND id=$2)", user_id, req.Id).Scan(&exists)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.NotFound, "Property not found")
		}
	}

	if req.Id != 0 {
		err := db.DB.QueryRow(ctx, "SELECT EXISTS(SELECT 1 FROM categories WHERE user_id=$1 AND id=$2)", user_id, req.CategoryId).Scan(&exists)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.NotFound, "Category_not_found")
		}
	}

	_, err := db.DB.Exec(ctx,
		`DELETE FROM properties_categories
		WHERE user_id = $1 AND property_id = $2 AND category_id = $3`,
		user_id, req.Id, req.CategoryId)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.Aborted, "Error unbind category")
	}

	return s.AdminPropertyCategories(ctx, &v1.AdminPropertyRequest{Id: req.Id})
}

func (s *AdminPropertyServiceImpl) AdminEditPropertyValue(ctx context.Context, req *v1.AdminEditPropertyValueRequest) (*v1.AdminPropertyResponse, error) {
	user_id := auth.GetUserUID(ctx)

	propertyValue := models.PropertyValue{}
	propertyValue.UserID = user_id
	propertyValue.PropertyID = uint(req.PropertyId)
	propertyValue.Value = req.Value
	propertyValue.Sort = uint(req.Sort)

	if req.Id != 0 {
		_, err := db.DB.Exec(ctx, `
		UPDATE properties_values SET value=$1, sort=$2
		WHERE user_id=$3 AND id=$4`,
			propertyValue.Value, propertyValue.Sort,
			propertyValue.UserID, req.Id)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.NotFound, "Property value not found")
		}
		propertyValue.ID = uint(req.Id)
	} else {
		err := db.DB.QueryRow(ctx, `
		INSERT INTO properties_values (user_id, property_id, value, sort)
		VALUES ($1, $2, $3, $4)
		RETURNING id
		`,
			propertyValue.UserID, propertyValue.PropertyID, propertyValue.Value, propertyValue.Sort).
			Scan(&propertyValue.ID)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.Aborted, "Error create property value")
		}
	}

	if req.Image != "" {
		directory := config.AppConfig.UploadPath + "/properties/" + strconv.Itoa(int(propertyValue.PropertyID)) + "/"
		file, err := upload.UploadImage(req.Image, directory, "thumb-"+strconv.Itoa(int(propertyValue.ID)), config.AppConfig.PropertyThumbSize)
		if err == nil {
			propertyValue.Image = *file
			_, err := db.DB.Exec(ctx, `
			UPDATE properties_values SET image=$1
			WHERE user_id=$2 AND id=$3`,
				propertyValue.Image,
				propertyValue.UserID, req.Id)
			if err != nil {
				logger.Error(err.Error())
			}
		}
	}
	return s.AdminProperty(ctx, &v1.AdminPropertyRequest{Id: req.PropertyId})
}

func (s *AdminPropertyServiceImpl) AdminDeletePropertyValue(ctx context.Context, req *v1.AdminPropertyValueRequest) (*v1.AdminPropertyResponse, error) {
	user_id := auth.GetUserUID(ctx)
	propertyValue := models.PropertyValue{}

	row := db.DB.QueryRow(ctx,
		`SELECT property_id, image FROM properties_values WHERE user_id = $1 AND id = $2`,
		user_id, req.Id)
	err := row.Scan(&propertyValue.PropertyID, &propertyValue.Image)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Property value not found")
	}

	_, err = db.DB.Exec(ctx,
		`DELETE FROM properties_values WHERE user_id = $1 AND id = $2`,
		user_id, req.Id)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.Aborted, "Delete property value error")
	}

	if propertyValue.Image != "" {
		directory := config.AppConfig.UploadPath + "/properties/" + strconv.Itoa(int(propertyValue.PropertyID)) + "/thumb-" + strconv.Itoa(int(propertyValue.ID)) + ".jpeg"
		os.RemoveAll(directory)
	}
	return s.AdminProperty(ctx, &v1.AdminPropertyRequest{Id: uint32(propertyValue.PropertyID)})
}

func (s *AdminPropertyServiceImpl) AdminUploadProperty(ctx context.Context, req *v1.AdminUploadPropertyRequest) (*v1.AdminPropertyResponse, error) {
	user_id := auth.GetUserUID(ctx)

	code := utils.Translit(strings.ToLower(req.Title))
	property := models.Property{}
	row := db.DB.QueryRow(ctx,
		`SELECT id, user_id, title, code, type,	display, required, multiple, sort
			FROM properties
			WHERE user_id = $1 AND code = $2`,
		user_id, code)
	err := row.Scan(&property.ID, &property.UserID, &property.Title, &property.Code, &property.Type,
		&property.Display, &property.Required, &property.Multiple, &property.Sort)
	if err != nil && err == sql.ErrNoRows {
		property.UserID = user_id
		property.Title = req.Title
		property.Code = code
		property.Type = models.PropertyType(models.StringProperty)
		property.Display = models.PropertyDisplayType(models.PropertyDisplayList)
		var lastSort uint
		row := db.DB.QueryRow(ctx,
			`SELECT sort
			FROM properties
			WHERE user_id = $1
			ORDER BY sort DESC`,
			user_id)
		row.Scan(&lastSort)
		property.Sort = lastSort + 10
		err := db.DB.QueryRow(ctx, `
		INSERT INTO properties (user_id, title, code, type, display, sort)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id
		`,
			property.UserID, property.Title, property.Code, property.Type, property.Display,
			property.Sort).Scan(&property.ID)
		if err != nil {
			logger.Error(err.Error())
		}
	}

	propertyValue := models.PropertyValue{}
	row = db.DB.QueryRow(ctx,
		`SELECT id, user_id, property_id, value, sort
			FROM properties_values
			WHERE user_id = $1 AND value = $2`,
		user_id, strings.ToLower(strings.TrimSpace(req.Value)))
	err = row.Scan(&property.ID, &property.UserID, &property.Title, &property.Code, &property.Type,
		&property.Display, &property.Required, &property.Multiple, &property.Sort)
	if err != nil && err == sql.ErrNoRows {
		propertyValue.UserID = user_id
		propertyValue.PropertyID = property.ID
		propertyValue.Value = req.Value
		var lastSort uint
		row := db.DB.QueryRow(ctx,
			`SELECT sort
			FROM properties_values
			WHERE user_id = $1 AND property_id = $2
			ORDER BY sort DESC`,
			user_id, property.ID)
		row.Scan(&lastSort)
		propertyValue.Sort = lastSort + 10
		err := db.DB.QueryRow(ctx, `
		INSERT INTO properties_values (user_id, property_id, value, sort)
		VALUES ($1, $2, $3, $4)
		RETURNING id
		`,
			propertyValue.UserID, propertyValue.PropertyID, propertyValue.Value, propertyValue.Sort).Scan(&propertyValue.ID)
		if err != nil {
			logger.Error(err.Error())
		}
	}

	offer := models.Item{}
	err = db.DB.QueryRow(ctx, "SELECT id, parent_id FROM items WHERE user_id=$1 AND id=$2", user_id, req.ItemId).Scan(&offer.ID, &offer.ParentID)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Item not found")
	}
	if offer.ParentID.Valid {
		err = db.DB.QueryRow(ctx, "SELECT id, parent_id FROM items WHERE user_id=$1 AND id=$2", user_id, offer.ParentID).Scan(&offer.ID, &offer.ParentID)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.NotFound, "Parent item not found")
		}
	}
	var categoryID int32
	err = db.DB.QueryRow(ctx, "SELECT category_id FROM items_categories WHERE user_id=$1 AND item_id=$2", user_id, offer.ID).Scan(&categoryID)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Item category not found")
	}

	_, err = db.DB.Exec(ctx,
		`INSERT INTO properties_categories (user_id, property_id, category_id) VALUES($1, $2, $3)
		ON CONFLICT ON CONSTRAINT properties_categories_pkey DO NOTHING`,
		user_id, propertyValue.ID, categoryID)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.Aborted, "Error bind category")
	}

	_, err = db.DB.Exec(ctx,
		`INSERT INTO items_properties (user_id, item_id, property_id, property_value_id) VALUES($1, $2, $3, $4)
		ON CONFLICT ON CONSTRAINT items_properties_pkey DO NOTHING`,
		user_id, req.ItemId, property.ID, propertyValue.ID)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.Aborted, "Error save item property ")
	}

	return s.AdminProperty(ctx, &v1.AdminPropertyRequest{Id: uint32(propertyValue.PropertyID)})
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.AdminPropertyServiceServer = (*AdminPropertyServiceImpl)(nil)
