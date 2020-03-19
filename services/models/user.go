package models

import (
	v1 "../api/v1"
	"github.com/jinzhu/gorm"
)

const (
	UserRole int = iota
	AdminRole
	ProducerRole
	DropshipperRole
)

type User struct {
	gorm.Model

	Fullname  string  `json:"fullname"`
	Phone     string  `json:"phone"`
	Email     string  `json:"email"`
	Password  string  `json:"password"`
	Photo     string  `json:"photo"`
	Role      uint    `json:"role"`
	Trademark string  `json:"trademark"`
	Tariff    uint    `json:"tariff"`
	Amount    float32 `json:"amount" sql:"type:decimal(10,2)"`
	About     string  `json:"about"`
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
