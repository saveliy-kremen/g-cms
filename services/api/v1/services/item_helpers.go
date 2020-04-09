package services

import (
	//"github.com/davecgh/go-spew/spew"
	"github.com/jinzhu/gorm"
	"os"
	"strconv"

	"../../../config"
	"../../../db"
	"../../../models"
)

func itemProperties(user_id uint32, item *models.Item) []models.Property {
	itemCategories := []models.ItemsCategories{}
	if item.ParentID == 0 {
		db.DB.Where("user_id = ? AND item_id = ?", user_id, item.ID).Find(&itemCategories)
	} else {
		db.DB.Where("user_id = ? AND item_id = ?", user_id, item.ParentID).Find(&itemCategories)
	}
	var cats []uint
	for _, itemCategory := range itemCategories {
		cats = append(cats, itemCategory.CategoryID)
		childCategoriesIDs := childCategoriesIDs(user_id, itemCategory.CategoryID)
		cats = append(cats, childCategoriesIDs...)
	}

	propertiesCategories := []models.PropertiesCategories{}
	db.DB.Where("user_id = ? AND category_id IN (?)", user_id, cats).Find(&propertiesCategories)
	var props []uint
	for _, propertiesCategory := range propertiesCategories {
		props = append(props, propertiesCategory.PropertyID)
	}
	properties := []models.Property{}
	db.DB.Preload("Values").Where("user_id = ? AND id IN(?)", user_id, props).Order("sort").Find(&properties)
	for propertyIndex, property := range properties {
		item_values_ids := []uint32{}
		item_property_values := []models.ItemProperty{}
		db.DB.Where("user_id = ? AND item_id = ? AND property_id = ?", user_id, item.ID, property.ID).Find(&item_property_values)
		for _, item_property_value := range item_property_values {
			item_values_ids = append(item_values_ids, item_property_value.PropertyValueID)
		}
		properties[propertyIndex].ItemValues = item_values_ids
	}
	return properties
}

func itemOffers(user_id uint32, item *models.Item, page *uint32, pageSize *uint32, sort *string, direction *string) []models.Item {
	offers := []models.Item{}
	req := db.DB.Preload("Images", func(db *gorm.DB) *gorm.DB {
		return db.Order(config.AppConfig.Prefix + "_item_images.sort ASC")
	}).Where("user_id = ? AND parent_id = ? AND draft = ?", user_id, item.ID, false)
	if sort != nil && *sort != "" {
		req = req.Order(*sort + " " + *direction)
	}
	if pageSize != nil && *pageSize != 0 {
		req = req.Offset(*page * *pageSize).Limit(*pageSize)
	}
	req.Find(&offers)
	for i, _ := range offers {
		offers[i].Properties = itemProperties(user_id, item)
	}
	return offers
}

func deleteItem(user_id uint32, item_id uint32) error {
	if err := db.DB.Unscoped().Where("user_id=? AND id = ?", user_id, item_id).Delete(&models.Item{}).Error; err != nil {
		return err
	} else {
		itemProperties := []models.ItemProperty{}
		db.DB.Where("user_id = ? AND item_id = ?", user_id, item_id).Find(&itemProperties)
		for _, itemProperty := range itemProperties {
			db.DB.Unscoped().Delete(&itemProperty)
		}
		itemImages := []models.ItemImage{}
		db.DB.Where("user_id = ? AND item_id = ?", user_id, item_id).Find(&itemImages)
		for _, itemImage := range itemImages {
			db.DB.Unscoped().Delete(&itemImage)
		}
		itemCategories := []models.ItemsCategories{}
		db.DB.Where("user_id = ? AND item_id = ?", user_id, item_id).Find(&itemCategories)
		for _, itemCategory := range itemCategories {
			db.DB.Unscoped().Delete(&itemCategory)
		}
		directory := config.AppConfig.UploadPath + "/users/" + strconv.Itoa(int(user_id)) + "/items/" + strconv.Itoa(int(item_id))
		os.RemoveAll(directory)
	}
	return nil
}