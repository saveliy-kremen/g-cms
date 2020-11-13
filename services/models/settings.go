package models

import (
	"time"

	v1 "gcms/api/v1"
)

type Settings struct {
	ID        uint64    `db:"id"`
	CreatedAt time.Time `db:"created_at""`

	UserID        uint32  `db:"user_id"`
	RozetkaMarkup float64 `db:"rozetka_markup"`
}

func AdminSettingsToResponse(settings Settings) *v1.AdminSettings {
	return &v1.AdminSettings{
		RozetkaMarkup: settings.RozetkaMarkup,
	}
}
