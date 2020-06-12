package db

import (
	"fmt"
	"log"
	"net"
	"os"
	"time"

	"github.com/jackc/pgx/v4/log/logrusadapter"
	"github.com/jackc/pgx/v4/pgxpool"
	"github.com/jackc/pgx/v4/stdlib"
	"github.com/jmoiron/sqlx"
	"github.com/sirupsen/logrus"

	"gcms/config"
)

type simpleFormater struct {
	pathMatch string
	logrus.TextFormatter
}

var (
	//DB pool
	DB *sqlx.DB
	//Logger to system.log
	Logger *logrus.Logger
)

func init() {
	var err error

	// use current directory to match stack frame
	// only for this package
	wd, err := os.Getwd()
	if err != nil {
		fmt.Println(err)
		return
	}
	Logger := logrus.New()
	Logger.SetLevel(logrus.ErrorLevel)
	Logger.SetFormatter(&simpleFormater{pathMatch: wd})
	Logger.SetReportCaller(true)
	file, err := os.OpenFile("services.log", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0755)
	if err != nil {
		log.Fatal(err)
	}
	Logger.SetOutput(file)

	cfg, err := pgxpool.ParseConfig("postgres://" + config.AppConfig.User + ":" + config.AppConfig.Password + "@localhost:5432/" + config.AppConfig.Dbname + "?sslmode=disable&search_path=" + config.AppConfig.Prefix)
	if err != nil {
		log.Fatal("Could not connecto to database ", err)
	}

	cfg.MaxConns = 8
	cfg.ConnConfig.TLSConfig = nil
	cfg.ConnConfig.PreferSimpleProtocol = true
	cfg.ConnConfig.RuntimeParams["standard_conforming_strings"] = "on"
	cfg.ConnConfig.Logger = logrusadapter.NewLogger(Logger)
	cfg.ConnConfig.DialFunc = (&net.Dialer{
		KeepAlive: 5 * time.Minute,
		Timeout:   1 * time.Second,
	}).DialContext

	pgxConfig := stdlib.RegisterConnConfig(cfg.ConnConfig)
	DB, err = sqlx.Connect("pgx", pgxConfig)
	if err != nil {
		log.Fatal("Could not connecto to database ", err)
	}
	DB.MustExec(schema)
}
