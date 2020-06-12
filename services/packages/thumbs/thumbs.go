package thumbs

import (
	"bytes"
	"image"
	"image/color"
	"image/draw"
	"image/jpeg"
	"io"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/davecgh/go-spew/spew"
	"github.com/disintegration/imaging"
	"github.com/fogleman/gg"

	"gcms/config"
)

type ThumbSize struct {
	Title string
	Size  string
}

func CreateThumb(filePath string, size string, directory string, filename string) (*string, error) {
	sizes := strings.Split(size, "x")
	sizeX, _ := strconv.Atoi(sizes[0])
	sizeY, _ := strconv.Atoi(sizes[1])
	fileReader, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	config, _, err := image.DecodeConfig(fileReader)
	fileReader, err = os.Open(filePath)
	defer fileReader.Close()
	src, format, err := image.Decode(fileReader)
	if err != nil {
		return nil, err
	}
	var thumb *image.NRGBA
	if config.Width > config.Height {
		thumb = imaging.Resize(src, sizeX, 0, imaging.Lanczos)
	} else {
		thumb = imaging.Resize(src, 0, sizeY, imaging.Lanczos)
	}
	if format != "png" {
		backgroundColor := color.RGBA{0xff, 0xff, 0xff, 0xff}
		dst := image.NewNRGBA(image.Rect(0, 0, sizeX, sizeY))
		draw.Draw(dst, dst.Bounds(), image.NewUniform(backgroundColor), image.Point{}, draw.Src)
		thumb = imaging.PasteCenter(dst, thumb)
	}

	if _, err := os.Stat(directory); err != nil {
		os.MkdirAll(directory, 0775)
	}
	os.Remove(directory + "/" + filename + ".jpeg")
	out, _ := os.Create(directory + "/" + filename + ".jpeg")
	defer out.Close()

	jpeg.Encode(out, thumb, nil)
	/*
		switch format {
		case "png":
			png.Encode(out, thumb)
		case "gif":
			gif.Encode(out, thumb, nil)
		default:
			jpeg.Encode(out, thumb, nil)
		}
	*/
	thumbName := filename + ".jpeg"
	return &thumbName, nil
}

func CreateThumbs(directory string, filename string, sizes []config.ThumbStruct) error {
	var extension = filepath.Ext(filename)
	var name = filename[0 : len(filename)-len(extension)]
	for _, size := range sizes {
		CreateThumb(directory+"/"+filename, size.Size, directory, size.Title+"-"+name)
	}
	return nil
}

func DeleteThumbs(directory string, filename string, sizes []config.ThumbStruct) error {
	for _, size := range sizes {
		os.Remove(directory + "/" + size.Title + "-" + filename)
	}
	return nil
}

func SetWatermark(path string, text string) {
	im, err := gg.LoadImage(path)
	if err != nil {
		spew.Dump(err)
		return
	}

	dc := gg.NewContextForImage(im)
	dc.SetRGB(1, 1, 1)
	dc.Clear()
	dc.SetRGB(0, 0, 0)
	if err := dc.LoadFontFace("../upload/library/fonts/Arial.ttf", 18); err != nil {
		panic(err)
	}
	lableWidth, lableHeight := dc.MeasureString(text)

	dc.DrawImage(im, 0, 0)
	dc.DrawRoundedRectangle(float64(dc.Width()-(int(lableWidth+40))), lableHeight-3, lableWidth+20, lableHeight+12, 10)
	dc.Fill()
	dc.SetRGB(1, 1, 1)
	dc.DrawStringWrapped(text, float64(dc.Width()-30), float64(lableHeight+9), 1, 0.5, lableWidth-50, 1, gg.AlignRight)
	dc.Clip()
	//dc.SaveJPG(path, 100)
}

func InstagramResize(filePath string) (io.Reader, error) {
	fileReader, err := os.Open(filePath)
	defer fileReader.Close()
	var thumb *image.NRGBA
	buf := new(bytes.Buffer)
	src, _, err := image.Decode(fileReader)
	if err == nil {
		thumb = imaging.Resize(src, 0, 800, imaging.Lanczos)
		backgroundColor := color.RGBA{0xff, 0xff, 0xff, 0xff}
		dst := image.NewNRGBA(image.Rect(0, 0, 800, 800))
		draw.Draw(dst, dst.Bounds(), image.NewUniform(backgroundColor), image.Point{}, draw.Src)
		thumb = imaging.PasteCenter(dst, thumb)
		jpeg.Encode(buf, thumb, nil)
	} else {
		return nil, err
	}
	return buf, nil
}
