package services

import (
	"context"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	v1 "../../../api/v1"
	"../../../db"
	"../../../models"
)

type CurrencyServiceImpl struct {
}

func (s *CurrencyServiceImpl) Currency(ctx context.Context, req *v1.CurrencyRequest) (*v1.CurrencyResponse, error) {
	Currency := models.Currency{}
	if db.DB.First(&Currency, req.Id).RecordNotFound() {
		return nil, status.Errorf(codes.NotFound, "Currency not found")
	}
	return &v1.CurrencyResponse{Currency: models.CurrencyToResponse(Currency)}, nil
}

func (s *CurrencyServiceImpl) Currencies(ctx context.Context, req *v1.CurrenciesRequest) (*v1.CurrenciesResponse, error) {
	currencies := []models.Currency{}
	var total uint32
	order := "sort"
	if req.Sort != "" {
		order = req.Sort + " " + req.Direction
	}
	limit := req.PageSize
	if limit == 0 {
		limit = ^uint32(0)
	}
	db.DB.Find(&currencies).Count(&total)
	db.DB.Order(order).Offset(req.Page * req.PageSize).Limit(limit).Find(&currencies)
	return &v1.CurrenciesResponse{Currencies: models.CurrenciesToResponse(currencies), Total: total}, nil
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.CurrencyServiceServer = (*CurrencyServiceImpl)(nil)
