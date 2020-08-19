package services

import (
	"context"
	"fmt"
	"gcms/config"
	"gcms/db"
	"gcms/models"
	"os"
	"strconv"

	"gcms/packages/utils"
)

func itemProperties(ctx context.Context, item *models.Item) []models.Property {
	var cats []uint32
	itemID := item.ID
	if item.ParentID.Valid {
		itemID = uint64(item.ParentID.Int64)
	}

	query := `SELECT category_id
		FROM items_categories
		WHERE user_id = $1 AND item_id = $2`
	rows, _ := db.DB.Query(ctx, query, item.UserID, itemID)
	defer rows.Close()
	for rows.Next() {
		var categoryID uint32
		err := rows.Scan(&categoryID)
		if err != nil {
			logger.Error(err.Error())
		}
		cats = append(cats, categoryID)
		childCategoriesIDs := childCategoriesIDs(ctx, item.UserID, categoryID)
		cats = append(cats, childCategoriesIDs...)
	}

	var props []uint32
	if len(cats) == 0 {
		query = `SELECT property_id
		FROM properties_categories
		WHERE user_id = $1`
	} else {
		query = fmt.Sprintf(`SELECT property_id
		FROM properties_categories
		WHERE user_id = $1 AND category_id IN(%v)`, utils.ArrayToString(cats))
	}
	rows, err := db.DB.Query(ctx, query, item.UserID)
	if err != nil {
		logger.Error(err.Error())
	}
	defer rows.Close()
	for rows.Next() {
		var propertyID uint32
		err := rows.Scan(&propertyID)
		if err != nil {
			logger.Error(err.Error())
		}
		props = append(props, propertyID)
	}

	properties := []models.Property{}
	if len(props) == 0 {
		query = `SELECT id, user_id, title, code, type, display, required, multiple, sort
		FROM properties
		WHERE user_id = $1
		ORDER BY sort`
	} else {
		query = fmt.Sprintf(`SELECT id, user_id, title, code, type, display, required, multiple, sort
		FROM properties
		WHERE user_id = $1 AND id IN(%v)
		ORDER BY sort`, utils.ArrayToString(props))
	}
	rows, err = db.DB.Query(ctx, query, item.UserID)
	if err != nil {
		logger.Error(err.Error())
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

	for propertyIndex, property := range properties {
		query = `SELECT id, user_id, property_id, value, image, sort
		FROM properties_values
		WHERE user_id = $1 AND property_id = $2
		ORDER BY sort`

		rows, err = db.DB.Query(ctx, query, item.UserID, property.ID)
		if err != nil {
			logger.Error(err.Error())
		}
		defer rows.Close()
		for rows.Next() {
			propertyValue := models.PropertyValue{}
			err := rows.Scan(&propertyValue.ID, &propertyValue.UserID, &propertyValue.PropertyID,
				&propertyValue.Value, &propertyValue.Image, &propertyValue.Sort)
			if err != nil {
				logger.Error(err.Error())
			}
			properties[propertyIndex].Values = append(properties[propertyIndex].Values, propertyValue)
		}

		query = `SELECT property_value_id
		FROM items_properties
		WHERE user_id = $1 AND item_id = $2 AND property_id = $3
		`

		rows, err = db.DB.Query(ctx, query, item.UserID, item.ID, property.ID)
		if err != nil {
			logger.Error(err.Error())
		}
		defer rows.Close()
		for rows.Next() {
			var propertyValueID uint32
			err := rows.Scan(&propertyValueID)
			if err != nil {
				logger.Error(err.Error())
			}
			properties[propertyIndex].ItemValues = append(properties[propertyIndex].ItemValues, propertyValueID)
		}
	}
	return properties
}

func itemOffers(item *models.Item, page *uint32, pageSize *uint32, sort *string, direction *string) []models.Item {
	offers := []models.Item{}
	/*
		req := db.DB.Preload("Images", func(db *gorm.DB) *gorm.DB {
			return db.Order(config.AppConfig.Prefix + "_item_images.sort ASC")
		}).Where("user_id = ? AND parent_id = ? AND draft = ?", item.UserID, item.ID, false)
		if sort != nil && *sort != "" {
			req = req.Order(*sort + " " + *direction)
		}
		if pageSize != nil && *pageSize != 0 {
			req = req.Offset(*page * *pageSize).Limit(*pageSize)
		}
		req.Find(&offers)
		for i, _ := range offers {
			offers[i].Properties = itemProperties(item)
		}
	*/
	return offers
}

func deleteItem(ctx context.Context, user_id uint32, item_id uint32) error {
	_, err := db.DB.Exec(ctx,
		`DELETE FROM items
		WHERE user_id = $1 AND id = $2`,
		user_id, item_id)
	if err == nil {
		directory := config.AppConfig.UploadPath + "/users/" + strconv.Itoa(int(user_id)) + "/items/" + strconv.Itoa(int(item_id))
		os.RemoveAll(directory)
	}
	return nil
}
