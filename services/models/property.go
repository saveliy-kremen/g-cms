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

	UserID   uint32
	Title    string
	Code     string
	Type     PropertyType
	Display  PropertyDisplayType
	Required bool
	Multiple bool
	Sort     uint

	Values     []PropertyValue
	ItemValues []uint32   `sql:"-"`
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
	UserID     uint32
	PropertyID uint
	CategoryID uint
}

func AdminPropertyValueToResponse(propertyValue PropertyValue) *v1.AdminPropertyValue {
	return &v1.AdminPropertyValue{
		Id:         uint32(propertyValue.ID),
		UserId:     uint32(propertyValue.UserID),
		PropertyId: uint32(propertyValue.PropertyID),
		Value:      propertyValue.Value,
		Image:      propertyValue.Image,
		Sort:       uint32(propertyValue.Sort),
	}
}

func AdminPropertyValuesToResponse(propertyValues []PropertyValue) []*v1.AdminPropertyValue {
	respPropertyValues := []*v1.AdminPropertyValue{}
	for _, propertyValue := range propertyValues {
		respPropertyValues = append(respPropertyValues, AdminPropertyValueToResponse(propertyValue))
	}
	return respPropertyValues
}

func AdminPropertyToResponse(property Property) *v1.AdminProperty {
	return &v1.AdminProperty{
		Id:         strconv.Itoa(int(property.ID)),
		UserId:     uint32(property.UserID),
		Title:      property.Title,
		Code:       property.Code,
		Type:       uint32(property.Type),
		Display:    uint32(property.Display),
		Required:   property.Required,
		Multiple:   property.Multiple,
		Sort:       uint32(property.Sort),
		Values:     AdminPropertyValuesToResponse(property.Values),
		ItemValues: property.ItemValues,
	}
}

func AdminPropertiesToResponse(properties []Property) []*v1.AdminProperty {
	respProperties := []*v1.AdminProperty{}
	for _, property := range properties {
		respProperties = append(respProperties, AdminPropertyToResponse(property))
	}
	return respProperties
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
		Id:         strconv.Itoa(int(property.ID)),
		UserId:     uint32(property.UserID),
		Title:      property.Title,
		Code:       property.Code,
		Type:       uint32(property.Type),
		Display:    uint32(property.Display),
		Required:   property.Required,
		Multiple:   property.Multiple,
		Sort:       uint32(property.Sort),
		Values:     PropertyValuesToResponse(property.Values),
		ItemValues: property.ItemValues,
	}
}

func PropertiesToResponse(properties []Property) []*v1.Property {
	respProperties := []*v1.Property{}
	for _, property := range properties {
		respProperties = append(respProperties, PropertyToResponse(property))
	}
	return respProperties
}
