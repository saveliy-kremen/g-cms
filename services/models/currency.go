package models

import (
	v1 "gcms/api/v1"
	"time"
)

type Currency struct {
	ID        uint32
	CreatedAt time.Time `db:"created_at"`

	Name      string
	ShortName string `db:"short_name"`
	Code      string
	Rate      float32
}

func CurrencyToResponse(currency Currency) *v1.Currency {
	return &v1.Currency{
		Id:        uint32(currency.ID),
		Name:      currency.Name,
		ShortName: currency.ShortName,
		Code:      currency.Code,
		Rate:      currency.Rate,
	}
}

func CurrenciesToResponse(currencies []Currency) []*v1.Currency {
	respCurrencies := []*v1.Currency{}
	for _, currency := range currencies {
		respCurrencies = append(respCurrencies, CurrencyToResponse(currency))
	}
	return respCurrencies
}
