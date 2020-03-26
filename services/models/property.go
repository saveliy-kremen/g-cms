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

	UserID  uint
	Title   string
	Code    string
	Type    PropertyType
	Display PropertyDisplayType
	Plural  bool
	Sort    uint

	Values []PropertyValue
}

type PropertyValue struct {
	gorm.Model

	PropertyID uint
	Value      string
	Sort       int
}

type PropertiesCategories struct {
	PropertyID uint
	CategoryID uint
}

func PropertyValueToResponse(propertyValue PropertyValue) *v1.PropertyValue {
	return &v1.PropertyValue{
		PropertyID: uint32(propertyValue.PropertyID),
		Value:      propertyValue.Value,
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
		UserID:  uint32(property.UserID),
		Title:   property.Title,
		Code:    property.Code,
		Type:    uint32(property.Type),
		Display: uint32(property.Display),
		Plural:  property.Plural,
		Sort:    uint32(property.Sort),
	}
}

func PropertiesToResponse(properties []Property) []*v1.Property {
	respProperties := []*v1.Property{}
	for _, property := range properties {
		respProperties = append(respProperties, PropertyToResponse(property))
	}
	return respProperties
}
