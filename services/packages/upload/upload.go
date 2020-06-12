package upload

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"image"
	"image/jpeg"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"gcms/config"
	"gcms/db"
	"gcms/packages/auth"
	"gcms/packages/thumbs"
)

func UploadFileHandler() http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("File Upload Endpoint Hit")
		w.Header().Set("Content-Type", "application/json")
		type Response struct {
			Url string `json:"url"`
		}

		// Parse our multipart form, 10 << 20 specifies a maximum
		// upload of 10 MB files.
		r.ParseMultipartForm(10 << 20)
		// FormFile returns the first file for the given key `file`
		// it also returns the FileHeader so we can get the Filename,
		// the Header and the size of the file
		file, handler, err := r.FormFile("file")
		if err != nil {
			fmt.Println("Error Retrieving the File")
			http.Error(w, "Error Retrieving the File: "+err.Error(), http.StatusBadRequest)
			return
		}
		defer file.Close()
		fmt.Printf("Uploaded File: %+v\n", handler.Filename)
		fmt.Printf("File Size: %+v\n", handler.Size)
		fmt.Printf("MIME Header: %+v\n", handler.Header)

		ctx := r.Context()
		userID := auth.GetUserUID(ctx)

		dir, _ := filepath.Abs(config.AppConfig.UploadPath)
		directory := dir + "/users/" + strconv.Itoa(int(userID)) + "/items/0/"
		if _, err := os.Stat(directory); err != nil {
			os.MkdirAll(directory, 0775)
		}

		// read all of the contents of our uploaded file into a
		// byte array
		fileBytes, err := ioutil.ReadAll(file)
		if err != nil {
			http.Error(w, "Error reading file: "+err.Error(), http.StatusBadRequest)
			return
		}

		err = ioutil.WriteFile(directory+handler.Filename, fileBytes, 0644)
		if err != nil {
			http.Error(w, "Error saving file: "+err.Error(), http.StatusBadRequest)
			return
		}
		res, err := db.DB.ExecContext(ctx, "INSERT INTO user_images (user_id, filename) VALUES($1, $2)", userID, handler.Filename)
		if err != nil {
			http.Error(w, "Error saving file: "+err.Error(), http.StatusBadRequest)
		}
		imageID, err := res.LastInsertId()
		thumb, err := thumbs.CreateThumb(directory+handler.Filename, config.AppConfig.Thumbs.Item, directory, strconv.Itoa(int(imageID)))
		if err != nil {
			http.Error(w, "Error create thumb file: "+err.Error(), http.StatusBadRequest)
			return
		}
		if handler.Filename != *thumb {
			os.Remove(directory + handler.Filename)
		}

		// return that we have successfully uploaded our file!
		resp := Response{
			Url: *thumb,
		}
		json.NewEncoder(w).Encode(resp)
	})
}

func UploadImage(data string, directory string, file string, size string) (*string, error) {
	os.RemoveAll(directory)
	os.MkdirAll(directory, 0775)
	secs := time.Now().Unix()
	img, _ := os.Create(directory + file)
	defer img.Close()

	i := strings.Index(data, ",")
	if i < 0 {
		return nil, errors.New("Unkwown format of image")
	}
	reader := base64.NewDecoder(base64.StdEncoding, strings.NewReader(data[i+1:]))
	src, _, err := image.Decode(reader)
	if err != nil {
		err := errors.New("Error decode image")
		return nil, err
	}
	jpeg.Encode(img, src, nil)
	thumb, err := thumbs.CreateThumb(directory+file, size, directory, file)
	if err != nil {
		return nil, err
	}
	os.Remove(directory + file)
	filename := *thumb + "?" + strconv.Itoa(int(secs))
	return &filename, nil
}
