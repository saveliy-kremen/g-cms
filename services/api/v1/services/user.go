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

	err := db.DB.QueryRow(ctx,
		`SELECT users.id, users.created_at, users.fullname, users.phone, users.email, users.password,
		users.photo, users.role, users.trademark, users.tariff, users.amount, users.about,
		users.upload_images FROM users WHERE email=$1`,
		req.Login).Scan(&user.ID, &user.CreatedAt, &user.Fullname, &user.Phone, &user.Email,
		&user.Password, &user.Photo, &user.Role, &user.Trademark, &user.Tariff, &user.Amount,
		&user.About, &user.UploadImages)
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

	err := db.DB.QueryRow(ctx,
		`SELECT users.id FROM users WHERE email=$1`,
		req.Email).
		Scan(&user.ID)
	if err == nil {
		return nil, status.Errorf(codes.AlreadyExists, "User already exist")
	}
	user.Fullname = req.Fullname
	user.Phone = req.Phone
	user.Email = req.Email
	user.Password = auth.HashAndSalt([]byte(req.Password))

	err = db.DB.QueryRow(ctx, `
	INSERT INTO users (fullname, phone , email, password)
	VALUES ($1, $2, $3, $4) RETURNING id
	`, user.Fullname, user.Phone, user.Email, user.Password).Scan(&user.ID)
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, err.Error())
	}
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
