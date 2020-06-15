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

	Fullname  string
	Phone     string
	Email     string
	Password  string
	Photo     string
	Role      uint32
	Trademark string
	Tariff    uint32
	Amount    float32 `sql:"type:decimal(10,2)"`
	About     string
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
