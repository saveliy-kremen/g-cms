package services

import (
	"log"
	"time"

	_ "image/png"

	"github.com/golang/protobuf/ptypes"
	"github.com/golang/protobuf/ptypes/empty"
	"github.com/golang/protobuf/ptypes/timestamp"
	"golang.org/x/net/context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	v1 "gcms/api/v1"
	"gcms/db"
	"gcms/models"
	"gcms/packages/auth"
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
func (s *UserServiceImpl) Auth(ctx context.Context, req *v1.AuthRequest) (*v1.UserResponse, error) {
	user := models.User{}

	err := db.DB.GetContext(ctx, &user, "SELECT * FROM users WHERE email=$1", req.Login)
	if err != nil {
		return nil, status.Errorf(codes.PermissionDenied, "User not exist")
	}

	if !auth.ComparePasswords(user.Password, []byte(req.Password)) {
		log.Println("err")
		return nil, status.Errorf(codes.PermissionDenied, "Wrong password")
	}
	token := auth.CreateToken(user.ID)
	resp := &v1.UserResponse{User: models.UserToResponse(user),
		Token: token,
	}
	return resp, nil
}

// Get User profile or create if not found.
func (s *UserServiceImpl) Me(ctx context.Context, req *empty.Empty) (*v1.UserResponse, error) {
	user := auth.GetUser(ctx)
	token := auth.CreateToken(user.ID)
	resp := &v1.UserResponse{User: models.UserToResponse(user),
		Token: token,
	}
	return resp, nil
}

// Get User profile or create if not found.
func (s *UserServiceImpl) Register(ctx context.Context, req *v1.RegisterRequest) (*v1.UserResponse, error) {
	user := models.User{}

	err := db.DB.GetContext(ctx, &user, "SELECT * FROM users WHERE email=$1", req.Email)
	if err == nil {
		return nil, status.Errorf(codes.AlreadyExists, "User already exist")
	}
	user.Fullname = req.Fullname
	user.Phone = req.Phone
	user.Email = req.Email
	user.Password = auth.HashAndSalt([]byte(req.Password))

	res, err := db.DB.NamedExec(`
	INSERT INTO users (fullname, phone , email, password) 
	VALUES (:fullname, :phone, :email, :password)
	`, user)

	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, err.Error())
	}
	userID, err := res.LastInsertId()
	user.ID = uint32(userID)
	token := auth.CreateToken(user.ID)
	resp := &v1.UserResponse{
		User:  models.UserToResponse(user),
		Token: token,
	}
	return resp, nil
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.UserServiceServer = (*UserServiceImpl)(nil)
