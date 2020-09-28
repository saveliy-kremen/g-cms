package download

import (
	"context"
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

	"github.com/sirupsen/logrus"
)

var logger *logrus.Logger

func init() {
	logger = logrus.New()
	logger.SetReportCaller(true)
}

type Catalog struct {
	XMLName xml.Name  `xml:"yml_catalog"`
	Date    time.Time `xml:"date,attr"`
	Shop    Shop      `xml:"shop"`
}

type Shop struct {
	Name       string     `xml:"name"`
	Company    string     `xml:"company"`
	Url        string     `xml:"url"`
	Currencies []Currency `xml:"currencies>currency"`
	Categories []Category `xml:"categories>category"`
	Offers     []Offer    `xml:"offers>offer"`
}

type Category struct {
	ID     uint32 `xml:"id,attr"`
	Title  string `xml:",chardata"`
	Parent string `xml:"parentId,attr,omitempty"`
}

type Currency struct {
	Code string  `xml:"id,attr"`
	Rate float64 `xml:"rate,attr"`
}

type Offer struct {
	ID          uint32    `xml:"id,attr"`
	ParentID    *uint32   `xml:"group_id,attr"`
	UserID      uint32    `xml:"-"`
	NotDisable  bool      `xml:"available,attr"`
	Url         string    `xml:"url"`
	Title       string    `xml:"name"`
	Description string    `xml:"description"`
	CategoryID  *uint32   `xml:"categoryId"`
	Price       float64   `xml:"price"`
	CurrencyID  uint32    `xml:"currencyId"`
	Images      string    `xml:"-"`
	Properties  string    `xml:"-"`
	Params      []Param   `xml:"param"`
	Pictures    []Picture `xml:"picture"`
	VendorID    uint32    `xml:"vendorCode"`
	Vendor      string    `xml:"vendor"`
	Country     string    `xml:"country"`
	Available   bool      `xml:"available"`
	Count       uint32    `xml:"-"`
}

type Property struct {
	PropertyID      uint32 `json:"property_id"`
	PropertyValueID uint32 `json:"property_value_id"`
	Title           string `json:"title"`
	Value           string `json:"value"`
}

type Param struct {
	Name  string `xml:"name,attr"`
	Value string `xml:",chardata"`
}

type Picture struct {
	Url string `xml:",chardata"`
}

func Prom(ctx context.Context) {
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
		catalog := Catalog{}
		catalog.Date = time.Now()
		catalog.Shop.Name = user.ShopName
		catalog.Shop.Company = user.ShopName
		catalog.Shop.Url = user.ShopUrl
		catalog.Shop.Categories = getCategories(ctx, user.ID)
		catalog.Shop.Currencies = getCurrencies(ctx)
		catalog.Shop.Offers = getOffers(ctx, user.ID)

		out, err := xml.MarshalIndent(catalog, " ", "  ")
		logger.Error(err)
		file := xml.Header + string(out)

		dir, _ := filepath.Abs(config.AppConfig.DownloadPath)
		directory := dir + "/users/" + strconv.Itoa(int(user.ID)) + "/"
		if _, err := os.Stat(directory); err != nil {
			os.MkdirAll(directory, 0775)
		}
		_ = ioutil.WriteFile(directory+"prom.xml", []byte(file), 0644)
		fmt.Println("http://alllead.best/downloads/" + "users/" + strconv.Itoa(int(user.ID)) + "/prom.xml" + " - " + strconv.Itoa(len(catalog.Shop.Offers)))
	}
	if err = rows.Err(); err != nil {
		logger.Error(err.Error())
	}
}

func getCategories(ctx context.Context, userID uint32) []Category {
	categories := []Category{}
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
		category := Category{}
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

func getCurrencies(ctx context.Context) []Currency {
	currencies := []Currency{}
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
		currency := Currency{}
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

func getOffers(ctx context.Context, userID uint32) []Offer {
	offers := []Offer{}

	query := fmt.Sprintf(
		`SELECT items.id, items.parent_id, items.user_id, items.disable, items.title, items.description,
		items.price, items.currency_id, items.vendor_id, items.count, items.images, vendors.name,
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
			)
		FROM items
		INNER JOIN vendors ON items.vendor_id = vendors.id
		WHERE user_id = $1 AND draft <> $2
		ORDER BY id ASC`)
	rows, err := db.DB.Query(ctx, query, userID, true)
	if err != nil {
		logger.Error(err.Error())
	}
	defer rows.Close()
	for rows.Next() {
		offer := Offer{}
		err := rows.Scan(&offer.ID, &offer.ParentID, &offer.UserID, &offer.NotDisable, &offer.Title,
			&offer.Description, &offer.Price, &offer.CurrencyID, &offer.VendorID, &offer.Count,
			&offer.Images, &offer.Vendor, &offer.Properties, &offer.CategoryID)
		if err != nil {
			logger.Error(err.Error())
		}
		var images []models.ItemImage
		json.Unmarshal([]byte(offer.Images), &images)
		for _, image := range images {
			picture := Picture{}
			picture.Url = config.AppConfig.Host + "uploads/users/" +
				strconv.Itoa(int(offer.UserID)) + "/items/" + image.Path + "/" + image.Filename
			offer.Pictures = append(offer.Pictures, picture)
		}
		var properties []Property
		json.Unmarshal([]byte(offer.Properties), &properties)
		for _, property := range properties {
			param := Param{}
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
		offers = append(offers, offer)
	}
	if err = rows.Err(); err != nil {
		logger.Error(err.Error())
	}
	return offers
}
