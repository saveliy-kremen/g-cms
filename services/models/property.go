package models

import (
	"strconv"

	v1 "../api/v1"
	"github.com/jinzhu/gorm"
)

type PropertyType int
type PropertyDisplayType int

const (
	NumberProperty PropertyType = iota
	StringProperty
)

const (
	PropertyDisplayList PropertyDisplayType = iota
	PropertyDisplayCheckbox
	PropertyDisplaySlider
)

type Property struct {
	gorm.Model

	UserID  uint32
	Title   string
	Code    string
	Type    PropertyType
	Display PropertyDisplayType
	Plural  bool
	Sort    uint

	Values     []PropertyValue
	Categories []Category `gorm:"many2many:properties_categories;"`
}

type PropertyValue struct {
	gorm.Model

	UserID     uint32
	PropertyID uint
	Value      string
	Image      string
	Sort       uint
}

type PropertiesCategories struct {
	PropertyID uint
	CategoryID uint
}

func PropertyValueToResponse(propertyValue PropertyValue) *v1.PropertyValue {
	return &v1.PropertyValue{
		Id:         uint32(propertyValue.ID),
		UserId:     uint32(propertyValue.UserID),
		PropertyId: uint32(propertyValue.PropertyID),
		Value:      propertyValue.Value,
		Image:      propertyValue.Image,
		Sort:       uint32(propertyValue.Sort),
	}
}

func PropertyValuesToResponse(propertyValues []PropertyValue) []*v1.PropertyValue {
	respPropertyValues := []*v1.PropertyValue{}
	for _, propertyValue := range propertyValues {
		respPropertyValues = append(respPropertyValues, PropertyValueToResponse(propertyValue))
	}
	return respPropertyValues
}

func PropertyToResponse(property Property) *v1.Property {
	return &v1.Property{
		Id:      strconv.Itoa(int(property.ID)),
		UserId:  uint32(property.UserID),
		Title:   property.Title,
		Code:    property.Code,
		Type:    uint32(property.Type),
		Display: uint32(property.Display),
		Plural:  property.Plural,
		Sort:    uint32(property.Sort),
		Values:  PropertyValuesToResponse(property.Values),
	}
}

func PropertiesToResponse(properties []Property) []*v1.Property {
	respProperties := []*v1.Property{}
	for _, property := range properties {
		respProperties = append(respProperties, PropertyToResponse(property))
	}
	return respProperties
}
