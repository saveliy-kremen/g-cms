package download

import (
	"context"
	"encoding/xml"
	"fmt"
	"gcms/db"
	"time"

	"github.com/davecgh/go-spew/spew"
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
	ID          uint32  `xml:"id,attr"`
	ParentID    *uint32 `xml:"group_id,attr"`
	NotDisable  bool    `xml:"available,attr"`
	Url         string  `xml:"url"`
	Title       string  `xml:"name"`
	Description string  `xml:"description"`
	CategoryID  uint32  `xml:"categoryId"`
	Price       float64 `xml:"price"`
	CurrencyID  uint32  `xml:"currencyId"`
	Params      []Param
	Pictures    []Picture
	VendorID    uint32 `xml:"vendorCode"`
	Vendor      string `xml:"vendor"`
	Country     string `xml:"country"`
	Available   bool   `xml:"available"`
	Count       uint32 `xml:"-"`
}

type Param struct {
	Name  string `xml:"name,attr"`
	Value string `xml:",chardata"`
}

type Picture struct {
	Url string `xml:",chardata"`
}

func Prom(ctx context.Context) {
	catalog := Catalog{}
	catalog.Date = time.Now()
	catalog.Shop.Name = "shop name"
	catalog.Shop.Company = "company name"
	catalog.Shop.Url = "shop url"

	catalog.Shop.Categories = getCategories(ctx)
	catalog.Shop.Currencies = getCurrencies(ctx)
	catalog.Shop.Offers = getOffers(ctx)

	out, err := xml.MarshalIndent(catalog, " ", "  ")
	logger.Error(err)
	fmt.Println(xml.Header + string(out))
}

func getCategories(ctx context.Context) []Category {
	categories := []Category{}
	rows, err := db.DB.Query(ctx, `
    SELECT id, title, parent
	FROM categories
	WHERE parent <> '#'
    ORDER BY id ASC`)
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

func getOffers(ctx context.Context) []Offer {
	offers := []Offer{}

	query := fmt.Sprintf(
		`SELECT items.id, items.parent_id, items.disable, items.title, items.description,
		items.price, items.currency_id, items.vendor_id, items.count
		FROM items
		LEFT JOIN vendors ON items.vendor_id = vendors.id
		WHERE draft <> $1
		ORDER BY id ASC`)
	rows, err := db.DB.Query(ctx, query, true)
	if err != nil {
		logger.Error(err.Error())
	}
	defer rows.Close()
	for rows.Next() {
		offer := Offer{}
		err := rows.Scan(&offer.ID, &offer.ParentID, &offer.NotDisable, &offer.Title, &offer.Description,
			&offer.Price, &offer.CurrencyID, &offer.VendorID, &offer.Count)
		if err != nil {
			logger.Error(err.Error())
		}
		offers = append(offers, offer)
	}
	if err = rows.Err(); err != nil {
		logger.Error(err.Error())
	}
	spew.Dump(offers)
	return offers
}
