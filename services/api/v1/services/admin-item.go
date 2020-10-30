package services

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/golang/protobuf/ptypes/empty"
	"github.com/jackc/pgx/v4"
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

// item := models.Item{}
// fields, pointers := utils.GetDbFields("items", "item", item)
// spew.Dump(fields)
// spew.Dump(pointers)

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

	item.Offers = itemOffers(ctx, &item, nil, nil, nil, nil)

	return &v1.AdminItemResponse{Item: models.AdminItemToResponse(item)}, nil
}

func (s *AdminItemServiceImpl) AdminItems(ctx context.Context, req *v1.AdminItemsRequest) (*v1.AdminItemsResponse, error) {
	user_id := auth.GetUserUID(ctx)

	items := []models.Item{}
	var total uint32
	order := "sort"
	if req.Sort != "" {
		order = req.Sort + " " + req.Direction
	}

	err := db.DB.QueryRow(ctx, "SELECT count(*) FROM items WHERE user_id = $1 AND draft <> $2 AND parent_id IS $3", user_id, true, nil).Scan(&total)
	query := fmt.Sprintf(
		`SELECT items.id, items.created_at, items.user_id, items.draft, items.title, items.article,
		items.alias, items.images, items.description, items.price, items.old_price, items.count,
		items.in_stock, items.disable, items.sort, items.seo_title, items.seo_description,
		items.seo_keywords, items.parent_id, items.vendor_id, items.currency_id, vendors.id,
		vendors.created_at, vendors.name, vendors.country, currencies.id, currencies.created_at,
		currencies.name, currencies.short_name, currencies.code, currencies.rate
		FROM items
		LEFT JOIN vendors ON items.vendor_id = vendors.id
		LEFT JOIN currencies ON items.currency_id = currencies.id
		WHERE (user_id = $1 AND draft <> $2 AND parent_id IS $3)
		ORDER BY %s OFFSET $4 LIMIT $5`,
		order)
	rows, err := db.DB.Query(ctx, query, user_id, true, nil, req.Page*req.PageSize, req.PageSize)
	if err != nil {
		return nil, status.Errorf(codes.NotFound, "Items not found")
	}
	defer rows.Close()
	for rows.Next() {
		item := models.Item{}
		err := rows.Scan(&item.ID, &item.CreatedAt, &item.UserID, &item.Draft, &item.Title,
			&item.Article, &item.Alias, &item.Images, &item.Description, &item.Price, &item.OldPrice,
			&item.Count, &item.InStock, &item.Disable, &item.Sort, &item.SeoTitle,
			&item.SeoDescription, &item.SeoKeywords, &item.ParentID, &item.VendorID, &item.CurrencyID,
			&item.Vendor.ID, &item.Vendor.CreatedAt, &item.Vendor.Name, &item.Vendor.Country,
			&item.Currency.ID, &item.Currency.CreatedAt, &item.Currency.Name, &item.Currency.ShortName,
			&item.Currency.Code, &item.Currency.Rate)
		if err != nil {
			logger.Error(err.Error())
		}
		items = append(items, item)
	}
	if err = rows.Err(); err != nil {
		return nil, status.Errorf(codes.NotFound, "Items set error")
	}

	for i, item := range items {
		items[i].Offers = itemOffers(ctx, &item, nil, nil, nil, nil)
	}
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
		draft.ParentID = sql.NullInt64{0, true}
		draft.Title = ""
		draft.Alias = ""
		draft.Article = ""
	} else {
		//Offer
		row := db.DB.QueryRow(ctx,
			`SELECT title, alias, article FROM items WHERE user_id = $1 AND id=$2`,
			user_id, req.ParentId)
		err := row.Scan(&draft.Title, &draft.Alias, &draft.Article)
		if err != nil {
			logger.Error(err.Error())
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

	//Properties
	_, err := db.DB.Exec(ctx,
		`DELETE FROM items_properties WHERE user_id = $1 AND item_id = $2`,
		user_id, item.ID)
	if err != nil {
		logger.Error(err.Error())
	}
	for _, propertyValue := range req.Properties {
		var propertyID uint32
		row := db.DB.QueryRow(ctx,
			`SELECT id
			FROM properties
			WHERE user_id = $1 AND code = $2`,
			user_id, propertyValue.Code)
		err := row.Scan(&propertyID)
		if err == nil {
			for _, valueID := range propertyValue.PropertyValueIds {
				db.DB.QueryRow(ctx, `
			INSERT INTO items_properties (user_id, item_id, property_id, property_value_id)
			VALUES ($1, $2, $3, $4)
			`, user_id, item.ID, propertyID, valueID)
			}
		}
	}

	//Item images to remove
	var toRemoveItemImages []models.ItemImage
	toRemoveItemImagesMap := make(map[string]models.ItemImage)
	row := db.DB.QueryRow(ctx,
		`SELECT items.images
			FROM items
			WHERE items.user_id = $1 AND items.id = $2`,
		user_id, item.ID)
	err = row.Scan(&item.Images)
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
	user_id := auth.GetUserUID(ctx)

	err := deleteItem(ctx, user_id, req.Id)
	if err != nil {
		return nil, status.Errorf(codes.Aborted, "Error delete item")
	}
	return s.AdminItems(ctx, &v1.AdminItemsRequest{Page: req.Page, PageSize: req.PageSize, Sort: req.Sort, Direction: req.Direction})
}

func (s *AdminItemServiceImpl) AdminDeleteOffer(ctx context.Context, req *v1.AdminDeleteOfferRequest) (*v1.AdminOffersResponse, error) {
	user_id := auth.GetUserUID(ctx)

	err := deleteItem(ctx, user_id, req.Id)
	if err != nil {
		return nil, status.Errorf(codes.Aborted, "Error delete offer")
	}
	return s.AdminItemOffers(ctx, &v1.AdminOffersRequest{ItemId: req.ParentId, Page: req.Page, PageSize: req.PageSize, Sort: req.Sort, Direction: req.Direction})
}

func (s *AdminItemServiceImpl) AdminGetUploadImages(ctx context.Context, req *empty.Empty) (*v1.AdminUploadImagesResponse, error) {
	user := auth.GetUser(ctx)
	return &v1.AdminUploadImagesResponse{Images: models.AdminUploadImagesToResponse(user.UploadImages)}, nil
}

func (s *AdminItemServiceImpl) AdminItemCategories(ctx context.Context, req *v1.AdminItemRequest) (*v1.AdminCategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	var exists bool
	if req.Id != 0 {
		err := db.DB.QueryRow(ctx, "SELECT EXISTS(SELECT 1 FROM items WHERE user_id=$1 AND id=$2)", user_id, req.Id).Scan(&exists)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.NotFound, "Item not found")
		}
	}

	var cat []uint32
	query := fmt.Sprintf(
		`SELECT category_id
		FROM items_categories
		WHERE (item_id = $1)
		GROUP BY category_id`)
	rows, err := db.DB.Query(ctx, query, req.Id)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Items categories not found")
	}
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

func (s *AdminItemServiceImpl) AdminItemBindCategory(ctx context.Context, req *v1.AdminItemBindRequest) (*v1.AdminCategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	var exists bool
	if req.Id != 0 {
		err := db.DB.QueryRow(ctx, "SELECT EXISTS(SELECT 1 FROM items WHERE user_id=$1 AND id=$2)", user_id, req.Id).Scan(&exists)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.NotFound, "Item not found")
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
		`INSERT INTO items_categories (user_id, item_id, category_id) VALUES($1, $2, $3)
		ON CONFLICT ON CONSTRAINT items_categories_pkey 
		DO NOTHING`,
		user_id, req.Id, req.CategoryId)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.Aborted, "Error bind category")
	}
	return s.AdminItemCategories(ctx, &v1.AdminItemRequest{Id: user_id})
}

func (s *AdminItemServiceImpl) AdminItemUnbindCategory(ctx context.Context, req *v1.AdminItemBindRequest) (*v1.AdminCategoriesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	var exists bool
	if req.Id != 0 {
		err := db.DB.QueryRow(ctx, "SELECT EXISTS(SELECT 1 FROM items WHERE user_id=$1 AND id=$2)", user_id, req.Id).Scan(&exists)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.NotFound, "Item not found")
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
		`DELETE FROM items_categories
		WHERE user_id = $1 AND item_id = $2 AND category_id = $3`,
		user_id, req.Id, req.CategoryId)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.Aborted, "Error unbind category")
	}
	return s.AdminItemCategories(ctx, &v1.AdminItemRequest{Id: user_id})
}

func (s *AdminItemServiceImpl) AdminItemProperties(ctx context.Context, req *v1.AdminItemRequest) (*v1.AdminPropertiesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	item := models.Item{}
	row := db.DB.QueryRow(ctx,
		`SELECT items.id, items.user_id
		FROM items
		WHERE items.user_id = $1 AND items.id = $2`,
		user_id, req.Id)
	err := row.Scan(&item.ID, &item.UserID)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Item not found")
	}
	properties := itemProperties(ctx, &item)
	return &v1.AdminPropertiesResponse{Properties: models.AdminPropertiesToResponse(properties)}, nil
}

func (s *AdminItemServiceImpl) AdminItemOffers(ctx context.Context, req *v1.AdminOffersRequest) (*v1.AdminOffersResponse, error) {
	user_id := auth.GetUserUID(ctx)

	item := models.Item{}
	row := db.DB.QueryRow(ctx,
		`SELECT id
		FROM items
		WHERE user_id = $1 AND id = $2`,
		user_id, req.ItemId)
	err := row.Scan(&item.ID)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Item not found")
	}

	offers := []models.Item{}
	var total uint32
	err = db.DB.QueryRow(ctx, "SELECT count(*) FROM items WHERE user_id = $1 AND parent_id = $2 AND draft = $3", item.ID, false).Scan(&total)
	if err != nil {
		logger.Error(err.Error())
	}
	offers = itemOffers(ctx, &item, &req.Page, &req.PageSize, &req.Sort, &req.Direction)
	return &v1.AdminOffersResponse{Offers: models.AdminItemsToResponse(offers), Total: total}, nil
}

func (s *AdminItemServiceImpl) AdminUploadOffer(ctx context.Context, req *v1.AdminUploadOfferRequest) (*v1.AdminItemResponse, error) {
	user_id := auth.GetUserUID(ctx)

	var vendorID int32

	if req.Vendor != "" {
		err := db.DB.QueryRow(ctx, "SELECT id FROM vendors WHERE name=$1", req.Vendor).Scan(&vendorID)
		if err != nil && err == pgx.ErrNoRows {
			var vendorID int32
			row := db.DB.QueryRow(ctx, "INSERT INTO vendors (name, country) VALUES($1, $2) RETURNING (id)", req.Vendor, req.Country)
			err := row.Scan(&vendorID)
			if err != nil {
				logger.Error(err.Error())
			}
		}
	}

	item := models.Item{}

	alias := utils.Translit(strings.ToLower(req.Title))
	if req.ParentId == 0 {
		row := db.DB.QueryRow(ctx, `
		SELECT id, created_at, user_id, draft, title, article,
		alias, images, description, price, old_price, count, in_stock, disable, sort, seo_title,
		seo_description, seo_keywords, parent_id, vendor_id, currency_id
		FROM items
		WHERE (user_id=$1 AND alias=$2 AND parent_id IS NULL AND vendor_id=$3)`,
			user_id, alias, vendorID)
		row.Scan(&item.ID, &item.CreatedAt, &item.UserID, &item.Draft, &item.Title,
			&item.Article, &item.Alias, &item.Images, &item.Description, &item.Price,
			&item.OldPrice, &item.Count, &item.InStock, &item.Disable, &item.Sort,
			&item.SeoTitle, &item.SeoDescription, &item.SeoKeywords, &item.ParentID,
			&item.VendorID, &item.CurrencyID)
	} else {
		row := db.DB.QueryRow(ctx, `
		SELECT id, created_at, user_id, draft, title, article,
		alias, images, description, price, old_price, count, in_stock, disable, sort, seo_title,
		seo_description, seo_keywords, parent_id, vendor_id, currency_id
		FROM items
		WHERE (user_id=$1 AND alias=$2 AND parent_id=$3 AND vendor_id=$4)`,
			user_id, alias, req.ParentId, vendorID)
		row.Scan(&item.ID, &item.CreatedAt, &item.UserID, &item.Draft, &item.Title,
			&item.Article, &item.Alias, &item.Images, &item.Description, &item.Price,
			&item.OldPrice, &item.Count, &item.InStock, &item.Disable, &item.Sort,
			&item.SeoTitle, &item.SeoDescription, &item.SeoKeywords, &item.ParentID,
			&item.VendorID, &item.CurrencyID)
	}

	if item.Sort == 0 {
		var lastItemSort uint32
		row := db.DB.QueryRow(ctx,
			`SELECT sort
			FROM items
			WHERE (user_id=$1 AND parent_id=$2)
			ORDER BY sort DESC`,
			user_id, req.ParentId)
		row.Scan(&lastItemSort)
		item.Sort = lastItemSort + 10
	}

	item.UserID = user_id
	item.Title = req.Title
	item.Alias = alias
	item.Article = req.Article
	if req.ParentId == 0 {
		item.ParentID = sql.NullInt64{int64(req.ParentId), false}
	} else {
		item.ParentID = sql.NullInt64{int64(req.ParentId), true}
	}
	item.Price = req.Price
	item.Count = req.Count
	item.InStock = req.InStock
	item.Description = req.Description

	var currencyID int32
	err := db.DB.QueryRow(ctx, "SELECT id FROM currencies WHERE code=$1", req.Currency).Scan(&currencyID)
	if err != nil && err == pgx.ErrNoRows {
		var currencyID int32
		row := db.DB.QueryRow(ctx, "INSERT INTO currencies (code, name, short_name, rate) VALUES($1, $2, $3, $4) RETURNING (id)", req.Currency, req.Currency, req.Currency, 1)
		err := row.Scan(&currencyID)
		if err != nil {
			logger.Error(err.Error())
		}
	}
	if currencyID == 0 {
		item.CurrencyID = sql.NullInt32{currencyID, false}
	} else {
		item.CurrencyID = sql.NullInt32{currencyID, true}
	}
	if vendorID == 0 {
		item.VendorID = sql.NullInt32{vendorID, false}
	} else {
		item.VendorID = sql.NullInt32{vendorID, true}
	}

	if item.ID != 0 {
		_, err := db.DB.Exec(ctx, `
	UPDATE items SET user_id=$1, title=$2, alias=$3, article=$4, parent_id=$5, price=$6, count=$7,
	in_stock=$8, description=$9, currency_id=$10
	WHERE user_id=$11 AND id=$12`,
			item.UserID, item.Title, item.Alias, item.Article, item.ParentID, item.Price, item.Count,
			item.InStock, item.Description, item.CurrencyID, user_id, item.ID)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.Aborted, "Error save offer")
		}
	} else {
		row := db.DB.QueryRow(ctx, `
		INSERT INTO items (user_id, title, alias, article, parent_id, price, count,
		in_stock, description, vendor_id, currency_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING (id)`,
			item.UserID, item.Title, item.Alias, item.Article, item.ParentID, item.Price, item.Count,
			item.InStock, item.Description, item.VendorID, item.CurrencyID)
		err = row.Scan(&item.ID)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.Aborted, "Error save offer")
		}
	}

	if req.CategoryId != 0 {
		_, err := db.DB.Exec(ctx,
			`INSERT INTO items_categories (user_id, item_id, category_id) VALUES($1, $2, $3)
					ON CONFLICT ON CONSTRAINT items_categories_pkey 
					DO NOTHING`,
			user_id, item.ID, req.CategoryId)
		if err != nil {
			logger.Error(err.Error())
		}
	}

	//Images
	directory := config.AppConfig.UploadPath + "/users/" + strconv.Itoa(int(user_id)) + "/items/" + strconv.Itoa(int(item.ID)) + "/"
	os.RemoveAll(directory)
	os.MkdirAll(directory, 0775)
	itemImages := []models.ItemImage{}
	for _, image := range req.Images {
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
					itemImage.Filename = filename
					itemImage.Path = strconv.Itoa(int(item.ID))
					thumbs.CreateThumbs(directory, itemImage.Filename, config.AppConfig.Thumbs.Catalog)
					itemImages = append(itemImages, itemImage)
				}
			}
		}
	}
	itemImagesBuf, _ := json.Marshal(itemImages)
	item.Images = string(itemImagesBuf)
	_, err = db.DB.Exec(ctx, `
	UPDATE items SET images=$1
	WHERE user_id=$2 AND id=$3`,
		item.Images,
		item.UserID, item.ID)
	if err != nil {
		logger.Error(err.Error())
	}
	return &v1.AdminItemResponse{Item: models.AdminItemToResponse(item)}, nil
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.AdminItemServiceServer = (*AdminItemServiceImpl)(nil)
