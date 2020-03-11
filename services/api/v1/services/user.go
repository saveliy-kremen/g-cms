package services

import (
	"time"

	_ "image/png"

	"github.com/golang/protobuf/ptypes"
	"github.com/golang/protobuf/ptypes/empty"
	"github.com/golang/protobuf/ptypes/timestamp"
	"golang.org/x/net/context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	v1 "../../../api/v1"
	"../../../db"
	"../../../models"
	"../../../packages/auth"
)

func toProto(year, month, day int) *timestamp.Timestamp {
	t := time.Date(year, time.Month(month), day, 0, 0, 0, 0, time.Local)
	ts, err := ptypes.TimestampProto(t)
	if err != nil {
		panic(err)
	}
	return ts
}

type UserServiceImpl struct {
}

// Get User profile or create if not found.
func (u *UserServiceImpl) Auth(ctx context.Context, req *v1.AuthRequest) (*v1.AuthResponse, error) {
	user := models.User{}
	if db.DB.First(&user).RecordNotFound() {
		db.DB.Create(&user)
	}
	token := auth.CreateToken(user.ID)
	resp := &v1.AuthResponse{User: models.UserToResponse(user),
		Token: token,
	}
	return resp, nil
}

// Get User profile or create if not found.
func (u *UserServiceImpl) Me(ctx context.Context, req *empty.Empty) (*v1.UserResponse, error) {
	user := auth.GetUser(ctx)
	resp := &v1.UserResponse{User: models.UserToResponse(user)}

	return resp, nil
}

// Get User profile or create if not found.
func (u *UserServiceImpl) Register(ctx context.Context, req *v1.RegisterRequest) (*v1.AuthResponse, error) {
	user := models.User{}

	user.Fullname = req.Fullname
	user.Phone = req.Phone
	user.Email = req.Email
	user.Password = auth.HashAndSalt([]byte(req.Password))
	if err := db.DB.Create(&user).Error; err != nil {
		return nil, status.Errorf(codes.InvalidArgument, err.Error())
	}
	token := auth.CreateToken(user.ID)
	resp := &v1.AuthResponse{
		User:  models.UserToResponse(user),
		Token: token,
	}

	return resp, nil
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.UserServiceServer = (*UserServiceImpl)(nil)
