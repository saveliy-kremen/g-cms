package models

import (
	"strconv"

	v1 "gcms/api/v1"

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

	UserID   uint32              `db:"user_id"`
	Title    string              `db:"title"`
	Code     string              `db:"code"`
	Type     PropertyType        `db:"type"`
	Display  PropertyDisplayType `db:"display"`
	Required bool                `db:"required"`
	Multiple bool                `db:"multiple"`
	Sort     uint                `db:"sort"`

	Values     []PropertyValue
	ItemValues []uint32
	Categories []Category
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

type RozetkaPropertyData struct {
	ID         uint32
	Name       string
	IsGlobal   bool   `json:"is_global"`
	FilterType string `json:"filter_type"`
	AttrType   string `json:"attr_type"`

	ValueID   uint32 `json:"value_id"`
	ValueName string `json:"value_name"`
}

type RozetkaProperty struct {
	ID         uint32
	Name       string
	IsGlobal   bool
	FilterType string
	AttrType   string

	Values []RozetkaPropertyValue
}

type ItemRozetkaProperty struct {
	PropertyID        uint64
	PropertyName      string
	PropertyValueID   uint64
	PropertyValueName string
}

type RozetkaPropertyValue struct {
	ID   uint32
	Name string
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

func AdminRozetkaPropertyValueToResponse(propertyValue RozetkaPropertyValue) *v1.AdminRozetkaPropertyValue {
	return &v1.AdminRozetkaPropertyValue{
		Id:   uint32(propertyValue.ID),
		Name: propertyValue.Name,
	}
}

func AdminRozetkaPropertyValuesToResponse(propertyValues []RozetkaPropertyValue) []*v1.AdminRozetkaPropertyValue {
	respPropertyValues := []*v1.AdminRozetkaPropertyValue{}
	for _, propertyValue := range propertyValues {
		respPropertyValues = append(respPropertyValues, AdminRozetkaPropertyValueToResponse(propertyValue))
	}
	return respPropertyValues
}

func AdminRozetkaPropertyToResponse(property RozetkaProperty) *v1.AdminRozetkaProperty {
	return &v1.AdminRozetkaProperty{
		Id:         uint32(property.ID),
		Name:       property.Name,
		IsGlobal:   property.IsGlobal,
		FilterType: property.FilterType,
		AttrType:   property.AttrType,
		Values:     AdminRozetkaPropertyValuesToResponse(property.Values),
	}
}

func AdminRozetkaPropertiesToResponse(properties []RozetkaProperty) []*v1.AdminRozetkaProperty {
	respProperties := []*v1.AdminRozetkaProperty{}
	for _, property := range properties {
		respProperties = append(respProperties, AdminRozetkaPropertyToResponse(property))
	}
	return respProperties
}

func AdminItemRozetkaPropertyToResponse(property ItemRozetkaProperty) *v1.AdminItemRozetkaProperty {
	return &v1.AdminItemRozetkaProperty{
		PropertyId:        property.PropertyID,
		PropertyName:      property.PropertyName,
		PropertyValueId:   property.PropertyValueID,
		PropertyValueName: property.PropertyValueName,
	}
}

func AdminItemRozetkaPropertiesToResponse(properties []ItemRozetkaProperty) []*v1.AdminItemRozetkaProperty {
	respProperties := []*v1.AdminItemRozetkaProperty{}
	for _, property := range properties {
		respProperties = append(respProperties, AdminItemRozetkaPropertyToResponse(property))
	}
	return respProperties
}
