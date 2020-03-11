package upload

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	"../../config"
	"../../packages/auth"
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
