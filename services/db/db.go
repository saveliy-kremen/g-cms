package db

import (
	"fmt"
	"log"

	"../config"
	"../models"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var (
	DB *gorm.DB
)

func init() {
	var err error

	gorm.DefaultTableNameHandler = func(db *gorm.DB, defaultTableName string) string {
		return config.AppConfig.Prefix + "_" + defaultTableName
	}

	DB, err = gorm.Open("mysql", fmt.Sprintf("%v:%v@/%v?parseTime=True&loc=Local", config.AppConfig.User, config.AppConfig.Password, config.AppConfig.Dbname))
	if err != nil {
		log.Fatal("Could not connecto to database ", err)
	}
	DB.DB().SetMaxIdleConns(0)
	DB.AutoMigrate(&models.User{})
	//DB.LogMode(true)
}
