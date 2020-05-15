package models

import (
	v1 "../api/v1"
	"github.com/jinzhu/gorm"
)

type Currency struct {
	gorm.Model

	Name      string
	ShortName string
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
