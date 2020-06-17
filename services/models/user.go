package models

import (
	v1 "gcms/api/v1"
	"time"
)

const (
	UserRole int = iota
	AdminRole
	ProducerRole
	DropshipperRole
)

type User struct {
	ID        uint32
	CreatedAt time.Time `db:"created_at"`

	Fullname     string  `db:"fullname"`
	Phone        string  `db:"phone"`
	Email        string  `db:"email"`
	Password     string  `db:"password"`
	Photo        string  `db:"photo"`
	Role         uint32  `db:"role"`
	Trademark    string  `db:"trademark"`
	Tariff       uint32  `db:"tariff"`
	Amount       float32 `db:"amount"`
	About        string  `db:"about"`
	UploadImages string  `db:"upload_images"`
}

func UserToResponse(user User) *v1.User {
	return &v1.User{
		Id:        uint32(user.ID),
		Fullname:  user.Fullname,
		Phone:     user.Phone,
		Email:     user.Email,
		Photo:     user.Photo,
		Role:      uint32(user.Role),
		Trademark: user.Trademark,
		Tariff:    uint32(user.Tariff),
		Amount:    user.Amount,
		About:     user.About,
	}
}
