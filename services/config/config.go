package config

import (
	"encoding/json"
	"log"
	"os"
)

// Configuration Contains basic settings for connection to db
type Configuration struct {
	Name              string
	Host              string
	Domain            string
	Port              int
	EnvoyPort         int
	UploadPort        int
	Prefix            string
	User              string
	Password          string
	Dbname            string
	UploadPath        string
	ItemThumbSize     string
	CategoryThumbSize string
	PropertyThumbSize string
	CatalogThumbs     string
	JWTKey            string
	JWTExpire         int
}

//AppConfig Almacena la configuración del archivo config.json.
var AppConfig Configuration

//LoadAppConfig Lee el archivo config.json y lo decodifica en AppConfig
func init() {

	ConfigFilePath := "./config/config.json"
	file, err := os.Open(ConfigFilePath)

	defer file.Close()
	if err != nil {
		log.Fatal(err)
	}
	decoder := json.NewDecoder(file)
	AppConfig = Configuration{}
	err = decoder.Decode(&AppConfig)
	if err != nil {
		log.Fatal(err)
	}

}
