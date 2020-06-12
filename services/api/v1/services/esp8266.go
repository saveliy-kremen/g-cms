package services

import (
	"context"
	//"github.com/davecgh/go-spew/spew"

	v1 "gcms/api/v1"
)

type Esp8266ServiceImpl struct {
}

func (u *Esp8266ServiceImpl) SendData(ctx context.Context, req *v1.DataRequest) (*v1.DataResponse, error) {
	return &v1.DataResponse{Status: 1}, nil
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.Esp8266ServiceServer = (*Esp8266ServiceImpl)(nil)
