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

	"../../config"
	"../../packages/auth"
	"../../packages/thumbs"
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

		path := r.Form.Get("path")
		dir, _ := filepath.Abs(config.AppConfig.UploadPath)
		directory := dir + "/users/" + strconv.Itoa(int(userID)) + "/" + path + "/"
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

		// return that we have successfully uploaded our file!
		resp := Response{
			Url: "/users/" + strconv.Itoa(int(userID)) + "/" + path + "/" + handler.Filename,
		}
		json.NewEncoder(w).Encode(resp)
	})
}

func UploadImage(data string, directory string, file string) (string, error) {
	os.RemoveAll(directory)
	os.MkdirAll(directory, 0775)
	secs := time.Now().Unix()
	img, _ := os.Create(directory + file)
	defer img.Close()

	i := strings.Index(data, ",")
	if i < 0 {
		return "", errors.New("Unkwown format of image")
	}
	reader := base64.NewDecoder(base64.StdEncoding, strings.NewReader(data[i+1:]))
	src, _, err := image.Decode(reader)
	if err != nil {
		err := errors.New("Error decode image")
		return "", err
	}
	jpeg.Encode(img, src, nil)
	thumb := thumbs.CreateThumb(directory+file, config.AppConfig.CategoryThumbSize, directory, file+"-thumb")
	os.Remove(directory + file)
	return thumb + "?" + strconv.Itoa(int(secs)), nil
}
