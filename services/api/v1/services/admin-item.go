package services

import (
	"context"
	"database/sql"
	"encoding/json"
	"os"
	"strconv"
	"strings"

	"github.com/golang/protobuf/ptypes/empty"
	"github.com/sirupsen/logrus"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	v1 "gcms/api/v1"
	"gcms/config"
	"gcms/db"
	"gcms/models"
	"gcms/packages/auth"
	"gcms/packages/thumbs"
	"gcms/packages/utils"
)

type AdminItemServiceImpl struct {
}

var logger *logrus.Logger

func init() {
	logger = logrus.New()
	logger.SetReportCaller(true)
}

func (s *AdminItemServiceImpl) AdminItem(ctx context.Context, req *v1.AdminItemRequest) (*v1.AdminItemResponse, error) {
	user_id := auth.GetUserUID(ctx)

	item := models.Item{}
	row := db.DB.QueryRow(ctx,
		`SELECT items.id, items.created_at, items.user_id, items.vendor_id, items.parent_id,
			 items.draft, items.title, items.article, items.alias, items.images, items.description,
			 items.price, items.old_price, items.currency_id, items.count, items.in_stock, items.disable,
			 items.sort, items.seo_title, items.seo_description, items.seo_keywords,
			 vendors.id, vendors.created_at, vendors.name, vendors.country,
			 currencies.id, currencies.created_at, currencies.name, currencies.short_name, currencies.code,
			 currencies.rate
			FROM items
			LEFT JOIN vendors ON items.vendor_id = vendors.id
			LEFT JOIN currencies ON items.currency_id = currencies.id
			WHERE items.user_id = $1 AND items.id = $2`,
		user_id, req.Id)
	err := row.Scan(&item.ID, &item.CreatedAt, &item.UserID, &item.VendorID, &item.ParentID,
		&item.Draft, &item.Title, &item.Article, &item.Alias, &item.Images, &item.Description,
		&item.Price, &item.OldPrice, &item.CurrencyID, &item.Count, &item.InStock, &item.Disable,
		&item.Sort, &item.SeoTitle, &item.SeoDescription, &item.SeoKeywords,
		&item.Vendor.ID, &item.Vendor.CreatedAt, &item.Vendor.Name, &item.Vendor.Country,
		&item.Currency.ID, &item.Currency.CreatedAt, &item.Currency.Name, &item.Currency.ShortName,
		&item.Currency.Code, &item.Currency.Rate)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Item not found")
	}

	// fields, pointers := utils.GetDbFields("items", "item", item)
	// spew.Dump(fields)
	// spew.Dump(pointers)

	//item.Properties = itemProperties(&item)
	//item.Offers = itemOffers(&item, nil, nil, nil, nil)

	return &v1.AdminItemResponse{Item: models.AdminItemToResponse(item)}, nil
}

func (s *AdminItemServiceImpl) AdminItems(ctx context.Context, req *v1.AdminItemsRequest) (*v1.AdminItemsResponse, error) {
	//user_id := auth.GetUserUID(ctx)

	items := []models.Item{}
	var total uint32
	// order := "sort"
	// if req.Sort != "" {
	// 	order = req.Sort + " " + req.Direction
	// }

	// db.DB.GetContext(ctx, &total, "SELECT count(*) FROM items WHERE user_id = $1 AND draft <> $2 AND parent_id IS $3", user_id, true, nil)
	// query := fmt.Sprintf(
	// 	`SELECT items.* FROM items WHERE (user_id = $1 AND draft <> $2 AND parent_id IS $3)
	// 	ORDER BY %s OFFSET $4 LIMIT $5`,
	// 	order)
	// db.DB.SelectContext(ctx, &items, query, user_id, true, nil, req.Page*req.PageSize, req.PageSize)

	//db.DB.Preload("Vendor").Preload("Currency")
	/*
		for i, item := range items {
			db.DB.Preload("Vendor").Preload("Currency").Preload("Images", func(db *gorm.DB) *gorm.DB {
				return db.Order(config.AppConfig.Prefix + "_item_images.sort ASC")
			}).Where("user_id = ? AND parent_id = ?", user_id, item.ID).Order(order).Find(&items[i].Offers)
		}
	*/
	return &v1.AdminItemsResponse{Items: models.AdminItemsToResponse(items), Total: total}, nil
}

func (s *AdminItemServiceImpl) AdminCreateDraftItem(ctx context.Context, req *v1.AdminDraftRequest) (*v1.AdminItemResponse, error) {
	user_id := auth.GetUserUID(ctx)

	draft := models.Item{}
	row := db.DB.QueryRow(ctx, "SELECT id, title, alias, article FROM items WHERE user_id = $1 AND draft = $2", user_id, true)
	err := row.Scan(&draft.ID, &draft.Title, &draft.Alias, &draft.Article)
	if err != nil {
		draft.UserID = user_id
		draft.Draft = true
		row := db.DB.QueryRow(ctx, "INSERT INTO items (title, alias, user_id, draft) VALUES('', '', $1, $2) RETURNING (id)", draft.UserID, draft.Draft)
		err := row.Scan(&draft.ID)
		if err != nil {
			return nil, status.Errorf(codes.NotFound, "Admin add item error")
		}
	}
	db.DB.Exec(ctx,
		`DELETE FROM items WHERE user_id = $1 AND draft = $2 AND id <> $3`,
		user_id, true, draft.ID)

	if req.ParentId == 0 {
		//Item
		draft.ParentID = sql.NullInt64{0, false}
		draft.Title = ""
		draft.Alias = ""
		draft.Article = ""
	} else {
		//Offer
		row := db.DB.QueryRow(ctx,
			`SELECT title, alias, article FROM items WHERE user_id = $1 AND id=$2)`,
			user_id, req.ParentId)
		err := row.Scan(&draft.Title, &draft.Alias, &draft.Article)
		if err != nil {
			return nil, status.Errorf(codes.NotFound, "Parent item not found")
		}
		draft.ParentID = sql.NullInt64{int64(req.ParentId), true}
	}
	db.DB.Exec(ctx, `
		UPDATE items SET parent_id=$1, title=$2, alias=$3, article=$4
		WHERE id=$5
		`, draft.ParentID, draft.Title, draft.Alias, draft.Article, req.ParentId)
	return &v1.AdminItemResponse{Item: models.AdminItemToResponse(draft)}, nil
}

func (s *AdminItemServiceImpl) AdminEditItem(ctx context.Context, req *v1.AdminEditItemRequest) (*v1.AdminItemResponse, error) {
	user_id := auth.GetUserUID(ctx)

	item := models.Item{}

	item.UserID = user_id
	item.Title = req.Title
	if req.ParentId == 0 {
		item.ParentID = sql.NullInt64{int64(req.ParentId), false}
	} else {
		item.ParentID = sql.NullInt64{int64(req.ParentId), true}
	}
	item.Article = req.Article
	item.Alias = req.Alias
	if item.Alias == "" {
		item.Alias = utils.Translit(strings.ToLower(item.Title))
	}
	item.Count = req.Count
	item.InStock = req.InStock
	item.Description = req.Description
	if req.ParentId == 0 {
		item.VendorID = sql.NullInt32{int32(req.VendorId), false}
	} else {
		item.VendorID = sql.NullInt32{int32(req.VendorId), true}
	}
	item.Price = req.Price
	item.OldPrice = req.OldPrice
	if req.ParentId == 0 {
		item.CurrencyID = sql.NullInt32{int32(req.CurrencyId), false}
	} else {
		item.CurrencyID = sql.NullInt32{int32(req.CurrencyId), true}
	}
	item.Disable = req.Disable
	item.Sort = req.Sort
	item.Draft = false

	if req.Id != 0 {
		_, err := db.DB.Exec(ctx, `
		UPDATE items SET title=$1, parent_id=$2, article=$3, alias=$4, count=$5, in_stock=$6,
			description=$7, vendor_id=$8, price=$9, old_price=$10, currency_id=$11,	disable=$12,
			sort=$13, draft=$14
		WHERE user_id=$15 AND id=$16`,
			item.Title, item.ParentID, item.Article, item.Alias, item.Count, item.InStock,
			item.Description, item.VendorID, item.Price, item.OldPrice, item.CurrencyID, item.Disable,
			item.Sort, item.Draft,
			item.UserID, req.Id)
		if err != nil {
			return nil, status.Errorf(codes.NotFound, "Item not found")
		}
		item.ID = uint64(req.Id)
	} else {
		err := db.DB.QueryRow(ctx, `
		INSERT INTO items (user_id, title, parent_id, article, alias, count, in_stock, description,
			vendor_id, price, old_price, currency_id, disable, sort, draft
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
		RETURNING id
		`,
			item.UserID, item.Title, item.ParentID, item.Article, item.Alias, item.Count, item.InStock,
			item.Description, item.VendorID, item.Price, item.OldPrice, item.CurrencyID, item.Disable,
			item.Sort, item.Draft).Scan(&item.ID)
		if err != nil {
			return nil, status.Errorf(codes.Aborted, "Error create item")
		}
	}

	/*
		//Properties
		oldItemProperties := []models.ItemProperty{}
		db.DB.Where("user_id = ? AND item_id = ?", user_id, item.ID).Find(&oldItemProperties)
		for _, oldItemProperty := range oldItemProperties {
			db.DB.Unscoped().Delete(&oldItemProperty)
		}
		for _, propertyValue := range req.Properties {
			property := models.Property{}
			if !db.DB.Where("code = ?", propertyValue.Code).First(&property).RecordNotFound() {
				for _, valueID := range propertyValue.PropertyValueIds {
					itemProperty := models.ItemProperty{}
					itemProperty.UserID = user_id
					itemProperty.ItemID = uint32(item.ID)
					itemProperty.PropertyID = uint32(property.ID)
					itemProperty.PropertyValueID = valueID
					db.DB.Create(&itemProperty)
				}
			}
		}
	*/

	//Item images to remove
	var toRemoveItemImages []models.ItemImage
	toRemoveItemImagesMap := make(map[string]models.ItemImage)
	row := db.DB.QueryRow(ctx,
		`SELECT items.images
			FROM items
			WHERE items.user_id = $1 AND items.id = $2`,
		user_id, item.ID)
	err := row.Scan(&item.Images)
	if err != nil {
		logger.Error(err.Error())
	} else {
		json.Unmarshal([]byte(item.Images), &toRemoveItemImages)
	}
	for i := 0; i < len(toRemoveItemImages); i++ {
		toRemoveItemImagesMap[toRemoveItemImages[i].Filename] = toRemoveItemImages[i]
	}

	//Upload images to remove
	var toRemoveUploadImages []models.UploadImage
	toRemoveUploadImagesMap := make(map[string]models.UploadImage)
	userImages := ""
	row = db.DB.QueryRow(ctx,
		`SELECT users.upload_images
			FROM users
			WHERE users.id = $1`,
		user_id)
	err = row.Scan(&userImages)
	if err != nil {
		logger.Error(err.Error())
	} else {
		json.Unmarshal([]byte(userImages), &toRemoveUploadImages)
	}
	for i := 0; i < len(toRemoveUploadImages); i++ {
		toRemoveUploadImagesMap[toRemoveUploadImages[i].Filename] = toRemoveUploadImages[i]
	}

	directory := config.AppConfig.UploadPath + "/users/" + strconv.Itoa(int(user_id)) + "/items/"
	if _, err := os.Stat(directory + strconv.Itoa(int(item.ID))); err != nil {
		os.MkdirAll(directory+strconv.Itoa(int(item.ID)), 0775)
	}

	//Item images handle
	itemImages := []models.ItemImage{}
	if req.ItemImages != "" {
		json.Unmarshal([]byte(req.ItemImages), &itemImages)
		for i, itemImage := range itemImages {
			if itemImage.Path != strconv.Itoa(int(item.ID)) {
				os.Rename(directory+itemImage.Path+"/"+itemImage.Filename, directory+strconv.Itoa(int(item.ID))+"/"+itemImage.Filename)
				thumbs.CreateThumbs(directory+strconv.Itoa(int(item.ID)), itemImage.Filename, config.AppConfig.Thumbs.Catalog)
				itemImages[i].Path = strconv.Itoa(int(item.ID))
			}
			delete(toRemoveItemImagesMap, itemImage.Filename)
		}
	}

	//Upload images handle
	uploadImages := []models.UploadImage{}
	if req.UploadImages != "" {
		json.Unmarshal([]byte(req.UploadImages), &uploadImages)
		for i, uploadImage := range uploadImages {
			if uploadImage.Path != "0" {
				os.Rename(directory+strconv.Itoa(int(item.ID))+"/"+uploadImage.Filename, directory+"0/"+uploadImage.Filename)
				thumbs.DeleteThumbs(directory+strconv.Itoa(int(item.ID)), uploadImage.Filename, config.AppConfig.Thumbs.Catalog)
				uploadImages[i].Path = "0"
			}
			delete(toRemoveUploadImagesMap, uploadImage.Filename)
		}
	}

	//Item images to remove handle
	for _, deleteImage := range toRemoveItemImagesMap {
		os.Remove(directory + strconv.Itoa(int(item.ID)) + "/" + deleteImage.Filename)
		thumbs.DeleteThumbs(directory+strconv.Itoa(int(item.ID)), deleteImage.Filename, config.AppConfig.Thumbs.Catalog)
	}

	//Upload images to remove handle
	for _, deleteImage := range toRemoveUploadImagesMap {
		os.Remove(directory + "0/" + deleteImage.Filename)
	}

	itemImagesBuf, _ := json.Marshal(itemImages)
	item.Images = string(itemImagesBuf)
	_, err = db.DB.Exec(ctx, `
	UPDATE items SET images=$1
	WHERE user_id=$2 AND id=$3`,
		item.Images,
		item.UserID, req.Id)
	if err != nil {
		logger.Error(err.Error())
	}

	userImagesBuf, _ := json.Marshal(uploadImages)
	_, err = db.DB.Exec(ctx, `
	UPDATE users SET upload_images=$1 WHERE id=$2`,
		string(userImagesBuf), user_id)
	if err != nil {
		logger.Error(err.Error())
	}

	return &v1.AdminItemResponse{Item: models.AdminItemToResponse(item)}, nil
}

func (s *AdminItemServiceImpl) AdminDeleteItem(ctx context.Context, req *v1.AdminDeleteItemRequest) (*v1.AdminItemsResponse, error) {
	//user_id := auth.GetUserUID(ctx)

	/*
		err := deleteItem(user_id, req.Id)
		if err != nil {
			return nil, status.Errorf(codes.Aborted, "Error delete item")
		}
	*/
	return s.AdminItems(ctx, &v1.AdminItemsRequest{Page: req.Page, PageSize: req.PageSize, Sort: req.Sort, Direction: req.Direction})
}

func (s *AdminItemServiceImpl) AdminDeleteOffer(ctx context.Context, req *v1.AdminDeleteOfferRequest) (*v1.AdminOffersResponse, error) {
	//user_id := auth.GetUserUID(ctx)

	/*
		err := deleteItem(user_id, req.Id)
		if err != nil {
			return nil, status.Errorf(codes.Aborted, "Error delete offer")
		}
	*/
	return s.AdminItemOffers(ctx, &v1.AdminOffersRequest{ItemId: req.ParentId, Page: req.Page, PageSize: req.PageSize, Sort: req.Sort, Direction: req.Direction})
}

func (s *AdminItemServiceImpl) AdminGetUploadImages(ctx context.Context, req *empty.Empty) (*v1.AdminUploadImagesResponse, error) {
	user := auth.GetUser(ctx)
	return &v1.AdminUploadImagesResponse{Images: models.AdminUploadImagesToResponse(user.UploadImages)}, nil
}

func (s *AdminItemServiceImpl) AdminItemCategories(ctx context.Context, req *v1.AdminItemRequest) (*v1.AdminCategoriesResponse, error) {
	//user_id := auth.GetUserUID(ctx)

	//item := models.Item{}
	if req.Id != 0 {
		// err := db.DB.GetContext(ctx, &item, "SELECT * FROM items WHERE user_id=$1 AND id=$2", user_id, req.Id)
		// if err != nil {
		// 	return nil, status.Errorf(codes.NotFound, "Item not found")
		// }
	}

	categories := []models.Category{}
	/*
		db.DB.Model(&item).Related(&categories, "Categories")
		var cat []uint
		for _, category := range categories {
			cat = append(cat, category.ID)
		}
		categories = []models.Category{}
		db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)

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
	*/
	return &v1.AdminCategoriesResponse{Categories: models.AdminCategoriesToResponse(categories)}, nil
}

func (s *AdminItemServiceImpl) AdminItemBindCategory(ctx context.Context, req *v1.AdminItemBindRequest) (*v1.AdminCategoriesResponse, error) {
	//user_id := auth.GetUserUID(ctx)

	//item := models.Item{}
	// err := db.DB.GetContext(ctx, &item, "SELECT * FROM items WHERE user_id=$1, id=$2", user_id, req.Id)
	// if err != nil {
	// 	return nil, status.Errorf(codes.NotFound, "Item not found")
	// }

	//category := models.Category{}
	// err := db.DB.GetContext(ctx, &category, "SELECT * FROM categories WHERE user_id=$1, id=$2", user_id, req.CategoryId)
	// if err != nil {
	// 	return nil, status.Errorf(codes.NotFound, "Category_not_found")
	// }

	//itemCategory := models.ItemsCategories{}

	/*
		if db.DB.Where("user_id = ? AND item_id = ? AND category_id = ?", user_id, req.Id, req.CategoryId).First(&itemCategory).RecordNotFound() {
			itemCategory.UserID = user_id
			itemCategory.ItemID = uint(req.Id)
			itemCategory.CategoryID = category.ID
			if db.DB.Save(&itemCategory).Error != nil {
				return nil, status.Errorf(codes.Aborted, "Error bind category")
			}
		}
	*/

	categories := []models.Category{}
	/*
		db.DB.Model(&item).Related(&categories, "Categories")
		var cat []uint
		for _, category := range categories {
			cat = append(cat, category.ID)
		}
		categories = []models.Category{}
		db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)

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
	*/
	return &v1.AdminCategoriesResponse{Categories: models.AdminCategoriesToResponse(categories)}, nil
}

func (s *AdminItemServiceImpl) AdminItemUnbindCategory(ctx context.Context, req *v1.AdminItemBindRequest) (*v1.AdminCategoriesResponse, error) {
	//user_id := auth.GetUserUID(ctx)

	//item := models.Item{}
	// err := db.DB.GetContext(ctx, &item, "SELECT * FROM items WHERE user_id=$1 AND id=$2", user_id, req.Id)
	// if err != nil {
	// 	return nil, status.Errorf(codes.NotFound, "Item not found")
	// }

	//category := models.Category{}
	// err = db.DB.GetContext(ctx, &category, "SELECT * FROM categories WHERE user_id=$1 AND id=$2", user_id, req.CategoryId)
	// if err != nil {
	// 	return nil, status.Errorf(codes.NotFound, "Category_not_found")
	// }

	/*
		itemCategory := models.ItemsCategories{}
		if db.DB.Unscoped().Where("user_id = ? AND item_id = ? AND category_id = ?", user_id, req.Id, req.CategoryId).Delete(&itemCategory).Error != nil {
			return nil, status.Errorf(codes.Aborted, "Error unbind category")
		}
	*/

	categories := []models.Category{}
	/*
		db.DB.Model(&item).Related(&categories, "Categories")
		var cat []uint
		for _, category := range categories {
			cat = append(cat, category.ID)
		}
		categories = []models.Category{}
		db.DB.Where("user_id = ?", user_id).Order("sort").Find(&categories)

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
	*/
	return &v1.AdminCategoriesResponse{Categories: models.AdminCategoriesToResponse(categories)}, nil
}

func (s *AdminItemServiceImpl) AdminItemProperties(ctx context.Context, req *v1.AdminItemRequest) (*v1.AdminPropertiesResponse, error) {
	//user_id := auth.GetUserUID(ctx)

	item := models.Item{}
	if req.Id != 0 {
		// err := db.DB.GetContext(ctx, &item, "SELECT * FROM items WHERE user_id=$1 AND id=$2", user_id, req.Id)
		// if err != nil {
		// 	logger.Error(err.Error())
		// 	return nil, status.Errorf(codes.NotFound, "Item not found")
		// }
	}
	properties := itemProperties(&item)
	return &v1.AdminPropertiesResponse{Properties: models.AdminPropertiesToResponse(properties)}, nil
}

func (s *AdminItemServiceImpl) AdminItemOffers(ctx context.Context, req *v1.AdminOffersRequest) (*v1.AdminOffersResponse, error) {
	//user_id := auth.GetUserUID(ctx)

	item := models.Item{}
	if req.ItemId != 0 {
		// err := db.DB.GetContext(ctx, &item, "SELECT * FROM items WHERE user_id=$1 AND id=$2", user_id, req.ItemId)
		// if err != nil {
		// 	return nil, status.Errorf(codes.NotFound, "Item not found")
		// }
	}

	offers := []models.Item{}
	var total uint32
	//db.DB.GetContext(ctx, &total, "SELECT count(*) FROM items WHERE user_id = $1 AND parent_id = $2 AND draft <> $3", user_id, item.ID, false)
	offers = itemOffers(&item, &req.Page, &req.PageSize, &req.Sort, &req.Direction)
	return &v1.AdminOffersResponse{Offers: models.AdminItemsToResponse(offers), Total: total}, nil
}

func (s *AdminItemServiceImpl) AdminUploadOffer(ctx context.Context, req *v1.AdminUploadOfferRequest) (*v1.AdminItemResponse, error) {
	//user_id := auth.GetUserUID(ctx)

	vendor := models.Vendor{}
	vendor.Name = sql.NullString{req.Vendor, true}
	vendor.Country = sql.NullString{req.Country, true}
	// err := db.DB.GetContext(ctx, &vendor, "SELECT * FROM vendors WHERE name=$1", sql.NullString{req.Vendor, true})
	// if err != nil && err == sql.ErrNoRows {
	// 	res, _ := db.DB.ExecContext(ctx, "INSERT INTO vendors (name, country) VALUES($1, $2)", req.Vendor, req.Country)
	// 	vendorID, _ := res.LastInsertId()
	// 	vendor.ID = sql.NullInt32{int32(vendorID), true}
	// }

	item := models.Item{}

	/*
		alias := utils.Translit(strings.ToLower(req.Title))
		db.DB.Where("user_id = ? AND alias = ? AND parent_id = ? AND vendor_id = ?", user_id, alias, req.ParentId, vendor.ID).First(&item)
		if item.Sort == 0 {
			lastItem := models.Item{}
			db.DB.Where("user_id = ? AND parent_id = ?", user_id, req.ParentId).Order("sort DESC").First(&lastItem)
			item.Sort = lastItem.Sort + 10
		}
		item.UserID = user_id
		item.Title = req.Title
		item.Alias = alias
		item.Article = req.Article
		item.ParentID = req.ParentId
		item.Price = req.Price
		item.Count = req.Count
		item.InStock = req.InStock
		item.Description = req.Description

		currency := models.Currency{}
		if db.DB.Where("code = ?", req.Currency).First(&currency).RecordNotFound() {
			currency.Code = req.Currency
			currency.Name = req.Currency
			currency.ShortName = req.Currency
			db.DB.Create(&currency)
		}
		item.CurrencyID = uint32(currency.ID)
		item.VendorID = uint32(vendor.ID)
		if db.DB.Save(&item).Error != nil {
			return nil, status.Errorf(codes.Aborted, "Error save offer")
		}

		if req.CategoryId != 0 {
			category := models.Category{}
			if !db.DB.Where("user_id = ?", user_id).First(&category, req.CategoryId).RecordNotFound() {
				itemCategory := models.ItemsCategories{}
				if db.DB.Where("user_id = ? AND item_id = ? AND category_id = ?", user_id, item.ID, category.ID).First(&itemCategory).RecordNotFound() {
					itemCategory.UserID = user_id
					itemCategory.ItemID = item.ID
					itemCategory.CategoryID = category.ID
					db.DB.Save(&itemCategory)
				}
			}
		}

		//Images
		directory := config.AppConfig.UploadPath + "/users/" + strconv.Itoa(int(user_id)) + "/items/" + strconv.Itoa(int(item.ID)) + "/"
		os.RemoveAll(directory)
		os.MkdirAll(directory, 0775)
		itemImages := []models.ItemImage{}
		db.DB.Where("user_id = ? AND item_id = ?", user_id, item.ID).Find(&itemImages)
		for _, itemImage := range itemImages {
			db.DB.Unscoped().Delete(&itemImage)
		}
		for i, image := range req.Images {
			resp, err := http.Get(image)
			if err == nil {
				defer resp.Body.Close()
				filepath := strings.Split(image, "/")
				filename := filepath[len(filepath)-1]
				file, err := os.Create(directory + filename)
				if err == nil {
					defer file.Close()
					_, err = io.Copy(file, resp.Body)
					if err == nil {
						itemImage := models.ItemImage{}
						itemImage.UserID = user_id
						itemImage.ItemID = uint32(item.ID)
						itemImage.Filename = filename
						itemImage.Sort = uint32(i * 10)
						db.DB.Create(&itemImage)
						thumb, err := thumbs.CreateThumb(directory+filename, config.AppConfig.Thumbs.Item, directory, strconv.Itoa(int(itemImage.ID)))
						if err == nil {
							itemImage.Filename = *thumb
							db.DB.Save(&itemImage)
							if filename != *thumb {
								os.Remove(directory + filename)
							}
							thumbs.CreateThumbs(directory, itemImage.Filename, config.AppConfig.Thumbs.Catalog)
						}
					}
				}
			}
		}
	*/
	return &v1.AdminItemResponse{Item: models.AdminItemToResponse(item)}, nil
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.AdminItemServiceServer = (*AdminItemServiceImpl)(nil)
