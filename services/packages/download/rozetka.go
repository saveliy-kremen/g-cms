package download

import (
	"context"
	"database/sql"
	"encoding/json"
	"encoding/xml"
	"fmt"
	"gcms/config"
	"gcms/db"
	"gcms/models"
	"io/ioutil"
	"os"
	"path/filepath"
	"strconv"
	"time"
)

const DefaultCount = 10
const DefaultVendor = "Alllead"

type RozetkaCatalog struct {
	XMLName xml.Name    `xml:"yml_catalog"`
	Date    time.Time   `xml:"date,attr"`
	Shop    RozetkaShop `xml:"shop"`
}

type RozetkaShop struct {
	Name       string            `xml:"name"`
	Company    string            `xml:"company"`
	Url        string            `xml:"url"`
	Currencies []RozetkaCurrency `xml:"currencies>currency"`
	Categories []RozetkaCategory `xml:"categories>category"`
	Offers     []RozetkaOffer    `xml:"offers>offer"`
}

type RozetkaCategory struct {
	ID     uint32 `xml:"id,attr"`
	Title  string `xml:",chardata"`
	Parent string `xml:"parentId,attr,omitempty"`
}

type RozetkaCurrency struct {
	Code string  `xml:"id,attr"`
	Rate float64 `xml:"rate,attr"`
}

type RozetkaOffer struct {
	ID          uint32           `xml:"id,attr"`
	ParentID    *uint32          `xml:"group_id,attr"`
	UserID      uint32           `xml:"-"`
	NotDisable  bool             `xml:"available,attr"`
	Url         string           `xml:"url"`
	Title       string           `xml:"name"`
	Description string           `xml:"description"`
	CategoryID  *uint32          `xml:"categoryId"`
	Price       float64          `xml:"price"`
	CurrencyID  string           `xml:"currencyId"`
	Images      string           `xml:"-"`
	Properties  string           `xml:"-"`
	Params      []RozetkaParam   `xml:"param"`
	Pictures    []RozetkaPicture `xml:"picture"`
	Vendor      sql.NullString   `xml:"vendor"`
	Country     string           `xml:"country"`
	Available   bool             `xml:"available"`
	Count       uint32           `xml:"stock_quantity"`
}

type RozetkaProperty struct {
	PropertyID      uint32 `json:"property_id"`
	PropertyValueID uint32 `json:"property_value_id"`
	Title           string `json:"title"`
	Value           string `json:"value"`
}

type RozetkaParam struct {
	Name  string `xml:"name,attr"`
	Value string `xml:",chardata"`
}

type RozetkaPicture struct {
	Url string `xml:",chardata"`
}

func Rozetka(ctx context.Context) {
	query := fmt.Sprintf(
		`SELECT id, shop_name, shop_url
		FROM users`)
	rows, err := db.DB.Query(ctx, query)
	if err != nil {
		logger.Error(err.Error())
	}
	defer rows.Close()
	for rows.Next() {
		user := models.User{}
		err := rows.Scan(&user.ID, &user.ShopName, &user.ShopUrl)
		if err != nil {
			logger.Error(err.Error())
		}
		catalog := RozetkaCatalog{}
		catalog.Date = time.Now()
		catalog.Shop.Name = user.ShopName
		catalog.Shop.Company = user.ShopName
		catalog.Shop.Url = user.ShopUrl
		catalog.Shop.Categories = getRozetkaCategories(ctx, user.ID)
		catalog.Shop.Currencies = getRozetkaCurrencies(ctx)
		catalog.Shop.Offers = getRozetkaOffers(ctx, user.ID)

		out, err := xml.MarshalIndent(catalog, " ", "  ")
		logger.Error(err)
		file := xml.Header + string(out)

		dir, _ := filepath.Abs(config.AppConfig.DownloadPath)
		directory := dir + "/users/" + strconv.Itoa(int(user.ID)) + "/"
		if _, err := os.Stat(directory); err != nil {
			os.MkdirAll(directory, 0775)
		}
		_ = ioutil.WriteFile(directory+"rozetka.xml", []byte(file), 0644)
		fmt.Println("http://alllead.best/downloads/" + "users/" + strconv.Itoa(int(user.ID)) + "/rozetka.xml" + " - " + strconv.Itoa(len(catalog.Shop.Offers)))
	}
	if err = rows.Err(); err != nil {
		logger.Error(err.Error())
	}
}

func getRozetkaCategories(ctx context.Context, userID uint32) []RozetkaCategory {
	categories := []RozetkaCategory{}
	rows, err := db.DB.Query(ctx, `
    SELECT id, title, parent
	FROM categories
	WHERE user_id = $1 AND parent <> '#'
    ORDER BY id ASC`, userID)
	if err != nil {
		logger.Error(err.Error())
	}
	defer rows.Close()
	for rows.Next() {
		category := RozetkaCategory{}
		err := rows.Scan(&category.ID, &category.Title, &category.Parent)
		if err != nil {
			logger.Error(err.Error())
		}
		if category.Parent == "1" {
			category.Parent = ""
		}
		categories = append(categories, category)
	}
	if err = rows.Err(); err != nil {
		logger.Error(err.Error())
	}
	return categories
}

func getRozetkaCurrencies(ctx context.Context) []RozetkaCurrency {
	currencies := []RozetkaCurrency{}
	query := fmt.Sprintf(
		`SELECT code, rate
		FROM currencies
		ORDER BY id`)
	rows, err := db.DB.Query(ctx, query)
	if err != nil {
		logger.Error(err.Error())
	}
	defer rows.Close()
	for rows.Next() {
		currency := RozetkaCurrency{}
		err := rows.Scan(&currency.Code, &currency.Rate)
		if err != nil {
			logger.Error(err.Error())
		}
		currencies = append(currencies, currency)
	}
	if err = rows.Err(); err != nil {
		logger.Error(err.Error())
	}
	return currencies
}

func getRozetkaOffers(ctx context.Context, userID uint32) []RozetkaOffer {
	offers := []RozetkaOffer{}

	var parentCategoryID sql.NullInt32
	var offerImages sql.NullString
	query := fmt.Sprintf(
		`SELECT items.id, items.parent_id, items.user_id, items.disable, items.title, items.description,
		items.price, items.count, items.images, vendors.name,
		(SELECT code
			FROM currencies
			WHERE currencies.id = items.currency_id
			LIMIT 1
		),
		'[' || array_to_string(array(
			SELECT row_to_json(row)
				FROM (
					SELECT items_properties.property_id, items_properties.property_value_id, properties.title,
					properties_values.value
					FROM items_properties
					INNER JOIN properties ON properties.id = items_properties.property_id
					INNER JOIN properties_values ON properties_values.id = items_properties.property_value_id
					WHERE item_id =items.id) row
		 	), ',') || ']',
		  	(SELECT items_categories.category_id 
				FROM items_categories
				WHERE user_id = $1 AND items_categories.item_id = items.id
				ORDER BY items_categories.category_id ASC
				LIMIT 1
			),
			(SELECT offer.images 
				FROM items offer
				WHERE offer.parent_id = items.id
				ORDER BY offer.sort ASC
				LIMIT 1
			),
			(SELECT pc.category_id 
				FROM items_categories pc
				WHERE user_id = $1 AND pc.item_id = items.parent_id
				LIMIT 1
			)
		FROM items
		LEFT JOIN vendors ON items.vendor_id = vendors.id
		WHERE user_id = $1 AND draft <> $2
		ORDER BY id ASC`)
	rows, err := db.DB.Query(ctx, query, userID, true)
	if err != nil {
		logger.Error(err.Error())
	}
	defer rows.Close()
	for rows.Next() {
		offer := RozetkaOffer{}
		err := rows.Scan(&offer.ID, &offer.ParentID, &offer.UserID, &offer.NotDisable, &offer.Title,
			&offer.Description, &offer.Price, &offer.Count, &offer.Images, &offer.Vendor,
			&offer.CurrencyID, &offer.Properties, &offer.CategoryID, &offerImages, &parentCategoryID)
		if err != nil {
			logger.Error(err.Error())
		}
		if !offer.Vendor.Valid {
			offer.Vendor = sql.NullString{String: DefaultVendor, Valid: true}
		}
		offer.Description = "<![CDATA[" + offer.Description + "]]>"
		var images []models.ItemImage
		if offer.ParentID == nil {
			offer.Images = offerImages.String
		} else {
			offer.Title += " (" + strconv.Itoa(int(offer.ID)) + ")"
			parentCategory := uint32(parentCategoryID.Int32)
			offer.CategoryID = &parentCategory
		}
		json.Unmarshal([]byte(offer.Images), &images)
		for _, image := range images {
			picture := RozetkaPicture{}
			picture.Url = config.AppConfig.Host + "uploads/users/" +
				strconv.Itoa(int(offer.UserID)) + "/items/" + image.Path + "/" + image.Filename
			offer.Pictures = append(offer.Pictures, picture)
		}
		var properties []RozetkaProperty
		json.Unmarshal([]byte(offer.Properties), &properties)
		for _, property := range properties {
			param := RozetkaParam{}
			param.Name = property.Title
			param.Value = property.Value
			offer.Params = append(offer.Params, param)
		}
		if offer.ParentID == nil {
			offer.Url = config.AppConfig.Host + "product/" + strconv.Itoa(int(offer.ID))
		} else {
			offer.Url = config.AppConfig.Host + "offer/" + strconv.Itoa(int(offer.ID))
		}
		offer.NotDisable = !offer.NotDisable
		offer.Available = offer.NotDisable
		if offer.Count == 0 {
			offer.Count = DefaultCount
		}
		offers = append(offers, offer)
	}
	if err = rows.Err(); err != nil {
		logger.Error(err.Error())
	}
	return offers
}
