package services

import (
	"context"

	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	v1 "gcms/api/v1"
	"gcms/db"
	"gcms/models"
	"gcms/packages/auth"
)

type AdminSettingsServiceImpl struct {
}

func (s *AdminSettingsServiceImpl) AdminSettings(ctx context.Context, req *empty.Empty) (*v1.AdminSettingsResponse, error) {
	user_id := auth.GetUserUID(ctx)

	settings := models.Settings{}
	err := db.DB.QueryRow(ctx,
		`SELECT rozetka_markup
			FROM settings
			WHERE user_id = $1`,
		user_id).Scan(&settings.RozetkaMarkup)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "Settings not found")
	}

	return &v1.AdminSettingsResponse{Settings: models.AdminSettingsToResponse(settings)}, nil
}

func (s *AdminSettingsServiceImpl) AdminEditSettings(ctx context.Context, req *v1.AdminEditSettingsRequest) (*v1.AdminSettingsResponse, error) {
	user_id := auth.GetUserUID(ctx)

	settings := models.Settings{}
	settings.RozetkaMarkup = req.RozetkaMarkup

	err := db.DB.QueryRow(ctx,
		`SELECT id
			FROM settings
			WHERE user_id = $1`,
		user_id).Scan(&settings.ID)
	if err == nil {
		_, err := db.DB.Exec(ctx, `
		UPDATE settings SET rozetka_markup=$1
		WHERE user_id=$2 AND id=$3`,
			settings.RozetkaMarkup, user_id, settings.ID)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.Aborted, "Save settings error")
		}
	} else {
		settings.UserID = user_id
		err := db.DB.QueryRow(ctx, `
		INSERT INTO settings (rozetka_markup, user_id)
		VALUES ($1, $2)
		RETURNING id
		`,
			settings.RozetkaMarkup, settings.UserID).Scan(&settings.ID)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.Aborted, "Save settings error")
		}
	}
	return s.AdminSettings(ctx, nil)
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.AdminSettingsServiceServer = (*AdminSettingsServiceImpl)(nil)
