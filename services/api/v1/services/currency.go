package services

import (
	"context"
	"fmt"

	v1 "gcms/api/v1"
	"gcms/db"
	"gcms/models"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type CurrencyServiceImpl struct {
}

func (s *CurrencyServiceImpl) Currency(ctx context.Context, req *v1.CurrencyRequest) (*v1.CurrencyResponse, error) {
	currency := models.Currency{}

	row := db.DB.QueryRow(ctx,
		`SELECT id, created_at, name, short_name, code, rate
		FROM currencies
		WHERE id = $1`,
		req.Id)
	err := row.Scan(&currency.ID, &currency.CreatedAt, &currency.Name, &currency.ShortName,
		&currency.Code, &currency.Rate)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Currency not found")
	}

	return &v1.CurrencyResponse{Currency: models.CurrencyToResponse(currency)}, nil
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

	db.DB.QueryRow(ctx, "SELECT count(*) FROM currencies").Scan(&total)
	query := fmt.Sprintf(
		`SELECT id, created_at, name, short_name, code, rate
		FROM currencies
		ORDER BY %s OFFSET $1 LIMIT $2`,
		order)
	rows, err := db.DB.Query(ctx, query, req.Page*req.PageSize, limit)
	if err != nil {
		logger.Error(err.Error())
	}
	defer rows.Close()
	for rows.Next() {
		currency := models.Currency{}
		err := rows.Scan(&currency.ID, &currency.CreatedAt, &currency.Name, &currency.ShortName,
			&currency.Code, &currency.Rate)
		if err != nil {
			logger.Error(err.Error())
		}
		currencies = append(currencies, currency)
	}
	if err = rows.Err(); err != nil {
		logger.Error(err.Error())
	}

	return &v1.CurrenciesResponse{Currencies: models.CurrenciesToResponse(currencies), Total: total}, nil
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.CurrencyServiceServer = (*CurrencyServiceImpl)(nil)
