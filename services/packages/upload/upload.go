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

	"github.com/google/uuid"

	"gcms/config"
	"gcms/db"
	"gcms/models"
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
		user := auth.GetUser(ctx)

		dir, _ := filepath.Abs(config.AppConfig.UploadPath)
		path := "0"
		directory := dir + "/users/" + strconv.Itoa(int(user.ID)) + "/items/" + path + "/"
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

		var uploadImages []models.UploadImage
		json.Unmarshal([]byte(user.UploadImages), &uploadImages)
		uploadImage := models.UploadImage{}
		uploadImage.Path = path
		filename := uuid.New().String()
		uploadImage.Filename = filename + ".jpeg"
		uploadImage.Name = handler.Filename
		uploadImages = append(uploadImages, uploadImage)
		images, err := json.Marshal(uploadImages)
		user.UploadImages = string(images)
		if err != nil {
			http.Error(w, "Error saving file: "+err.Error(), http.StatusBadRequest)
		}
		_, err = db.DB.Exec(ctx, `UPDATE users SET upload_images=$1 WHERE id=$2`, user.UploadImages, user.ID)
		if err != nil {
			http.Error(w, "Error saving file: "+err.Error(), http.StatusBadRequest)
		}
		thumb, err := thumbs.CreateThumb(directory+handler.Filename, config.AppConfig.Thumbs.Item, directory, filename)
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
