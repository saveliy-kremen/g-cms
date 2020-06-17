package models

import (
	"database/sql"
	v1 "gcms/api/v1"
)

type Currency struct {
	ID        sql.NullInt32 `db:"id"`
	CreatedAt sql.NullTime  `db:"created_at"`

	Name      sql.NullString  `db:"name"`
	ShortName sql.NullString  `db:"short_name"`
	Code      sql.NullString  `db:"code"`
	Rate      sql.NullFloat64 `db:"rate"`
}

func CurrencyToResponse(currency Currency) *v1.Currency {
	return &v1.Currency{
		Id:        uint32(currency.ID.Int32),
		Name:      currency.Name.String,
		ShortName: currency.ShortName.String,
		Code:      currency.Code.String,
		Rate:      float32(currency.Rate.Float64),
	}
}

func CurrenciesToResponse(currencies []Currency) []*v1.Currency {
	respCurrencies := []*v1.Currency{}
	for _, currency := range currencies {
		respCurrencies = append(respCurrencies, CurrencyToResponse(currency))
	}
	return respCurrencies
}
