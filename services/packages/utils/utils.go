package utils

import (
	"fmt"
	"reflect"
	"regexp"
	"strings"
)

func Find(slice []string, val string) (int, bool) {
	for i, item := range slice {
		if item == val {
			return i, true
		}
	}
	return -1, false
}

func HasElement(s interface{}, elem interface{}) bool {
	arrV := reflect.ValueOf(s)

	if arrV.Kind() == reflect.Slice {
		for i := 0; i < arrV.Len(); i++ {
			if arrV.Index(i).Interface() == elem {
				return true
			}
		}
	}

	return false
}

func ArrayToString(a []uint32) string {
	return strings.Trim(strings.Replace(fmt.Sprint(a), " ", ",", -1), "[]")
}

func Translit(s string) string {
	var translations = map[string]string{
		"А":   "A",
		"а":   "a",
		"Б":   "B",
		"б":   "b",
		"В":   "V",
		"в":   "v",
		"Г":   "G",
		"г":   "g",
		"Д":   "D",
		"д":   "d",
		"Е":   "E",
		"е":   "e",
		"Є":   "Ye",
		"є":   "ie",
		"Ё":   "Yo",
		"ё":   "yo",
		"Ж":   "Zh",
		"ж":   "zh",
		"З":   "Z",
		"з":   "z",
		"И":   "I",
		"и":   "i",
		"Й":   "J",
		"й":   "j",
		"І":   "I",
		"і":   "i",
		"Ї":   "Yi",
		"ї":   "yi",
		"К":   "K",
		"к":   "k",
		"Л":   "L",
		"л":   "l",
		"М":   "M",
		"м":   "m",
		"Н":   "N",
		"н":   "n",
		"О":   "O",
		"о":   "o",
		"П":   "P",
		"п":   "p",
		"Р":   "R",
		"р":   "r",
		"С":   "S",
		"с":   "s",
		"Т":   "T",
		"т":   "t",
		"У":   "U",
		"у":   "u",
		"Ф":   "F",
		"ф":   "f",
		"Х":   "H",
		"х":   "h",
		"Ц":   "C",
		"ц":   "c",
		"Ч":   "Ch",
		"ч":   "ch",
		"Ш":   "Sh",
		"ш":   "sh",
		"Щ":   "Shh",
		"щ":   "shh",
		"ь":   "",
		"ъ":   "",
		"Ы":   "Y",
		"ы":   "y",
		"Э":   "Je",
		"э":   "je",
		"Ю":   "Yu",
		"ю":   "yu",
		"Я":   "Ya",
		"я":   "ya",
		" ":   "_",
		"\\.": "",
		"/":   "_",
		"&":   "and",
		",":   "",
	}

	translate_string := s
	for k, v := range translations {
		r, _ := regexp.Compile(k)
		translate_string = r.ReplaceAllString(translate_string, v)
	}
	return translate_string
}

func StandardizeSpaces(s string) string {
	return strings.Join(strings.Fields(s), " ")
}

func GetDbFields(table string, itemName string, item interface{}) (string, string) {
	t := reflect.TypeOf(item)

	fields := ""
	pointers := ""

	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)

		tag := field.Tag.Get("struct")
		if tag != "" {
			subFields, subPointers := GetDbFieldsByType(tag, itemName+"."+field.Name, field.Type)
			fields += subFields
			pointers += subPointers
		}

		tag = field.Tag.Get("db")
		if tag != "" {
			fields += table + "." + tag + ", "
			pointers += "&" + itemName + "." + field.Name + ", "
		}
	}
	//fmt.Printf("%d. %v (%v), tag: '%v'\n", i+1, field.Name, field.Type, tag)
	return fields[:len(fields)-2], pointers[:len(pointers)-2]
}

func GetDbFieldsByType(table string, itemName string, t reflect.Type) (string, string) {
	fields := ""
	pointers := ""

	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)

		tag := field.Tag.Get("struct")
		if tag != "" {
			subFields, subPointers := GetDbFieldsByType(tag, itemName+"."+field.Name, field.Type)
			fields += subFields
			pointers += subPointers
		}

		tag = field.Tag.Get("db")
		if tag != "" {
			fields += table + "." + tag + ", "
			pointers += "&" + itemName + "." + field.Name + ", "
		}
	}
	return fields, pointers
}
