package services

import (
	"context"

	v1 "gcms/api/v1"
	"gcms/models"
)

type CurrencyServiceImpl struct {
}

func (s *CurrencyServiceImpl) Currency(ctx context.Context, req *v1.CurrencyRequest) (*v1.CurrencyResponse, error) {
	currency := models.Currency{}
	// err := db.DB.GetContext(ctx, &currency, "SELECT * FROM currencies WHERE id=$1", req.Id)
	// if err != nil {
	// 	return nil, status.Errorf(codes.NotFound, "Currency not found")
	// }
	return &v1.CurrencyResponse{Currency: models.CurrencyToResponse(currency)}, nil
}

func (s *CurrencyServiceImpl) Currencies(ctx context.Context, req *v1.CurrenciesRequest) (*v1.CurrenciesResponse, error) {
	currencies := []models.Currency{}
	var total uint32
	// order := "sort"
	// if req.Sort != "" {
	// 	order = req.Sort + " " + req.Direction
	// }
	limit := req.PageSize
	if limit == 0 {
		limit = ^uint32(0)
	}
	//db.DB.GetContext(ctx, &total, "SELECT count(*) FROM currencies")
	//query := fmt.Sprintf("SELECT * FROM currencies ORDER BY %s OFFSET $1 LIMIT $2", order)
	//db.DB.SelectContext(ctx, &currencies, query, req.Page*req.PageSize, limit)
	return &v1.CurrenciesResponse{Currencies: models.CurrenciesToResponse(currencies), Total: total}, nil
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.CurrencyServiceServer = (*CurrencyServiceImpl)(nil)
