package services

import (
	"context"
	"fmt"

	//"github.com/golang/protobuf/ptypes/empty"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	v1 "gcms/api/v1"
	"gcms/db"
	"gcms/models"
	"gcms/packages/auth"
)

type PropertyServiceImpl struct {
}

func (s *PropertyServiceImpl) Property(ctx context.Context, req *v1.PropertyRequest) (*v1.PropertyResponse, error) {
	user_id := auth.GetUserUID(ctx)

	property := models.Property{}

	row := db.DB.QueryRow(ctx,
		`SELECT id, user_id, title, code, type,	display, required, multiple, sort
			FROM properties
			WHERE user_id = $1 AND id = $2`,
		user_id, req.Id)
	err := row.Scan(&property.ID, &property.UserID, &property.Title, &property.Code, &property.Type,
		&property.Display, &property.Required, &property.Multiple, &property.Sort)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Property not found")
	}

	rows, err := db.DB.Query(ctx,
		`SELECT id, value, image,sort
		FROM properties_values
		WHERE user_id = $1 AND property_id = $2`,
		user_id, req.Id)
	defer rows.Close()
	for rows.Next() {
		propertyValue := models.PropertyValue{}
		err := rows.Scan(&propertyValue.ID, &propertyValue.Value, &propertyValue.Image, &propertyValue.Sort)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.NotFound, "Property values set error")
		}
		property.Values = append(property.Values, propertyValue)
	}
	if err = rows.Err(); err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Property values set error")
	}
	return &v1.PropertyResponse{Property: models.PropertyToResponse(property)}, nil
}

func (s *PropertyServiceImpl) Properties(ctx context.Context, req *v1.PropertiesRequest) (*v1.PropertiesResponse, error) {
	user_id := auth.GetUserUID(ctx)

	properties := []models.Property{}
	var total uint32

	order := "sort"
	if req.Sort != "" {
		order = req.Sort + " " + req.Direction
	}

	err := db.DB.QueryRow(ctx, "SELECT count(*) FROM properties WHERE user_id = $1", user_id).Scan(&total)
	query := fmt.Sprintf(
		`SELECT id, user_id, title, code, type,	display, required, multiple, sort
		FROM properties
		WHERE user_id = $1
		ORDER BY %s OFFSET $2 LIMIT $3`,
		order)
	rows, err := db.DB.Query(ctx, query, user_id, req.Page*req.PageSize, req.PageSize)
	if err != nil {
		return nil, status.Errorf(codes.NotFound, "Properties not found")
	}
	defer rows.Close()
	for rows.Next() {
		property := models.Property{}
		err := rows.Scan(&property.ID, &property.UserID, &property.Title, &property.Code, &property.Type,
			&property.Display, &property.Required, &property.Multiple, &property.Sort)
		if err != nil {
			logger.Error(err.Error())
		}
		properties = append(properties, property)
	}
	if err = rows.Err(); err != nil {
		logger.Error(err.Error())
	}

	return &v1.PropertiesResponse{Properties: models.PropertiesToResponse(properties), Position: (req.Page * req.PageSize) + 1, Total: total}, nil
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.PropertyServiceServer = (*PropertyServiceImpl)(nil)
