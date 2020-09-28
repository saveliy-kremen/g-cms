package services

import (
	"fmt"
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

// Change password
func (s *UserServiceImpl) ChangePassword(ctx context.Context, req *v1.ChangePasswordRequest) (*v1.UserResponse, error) {
	user := auth.GetUser(ctx)
	if user.ID == 0 {
		return nil, status.Errorf(codes.PermissionDenied, "User not exist")
	}
	if user.Active != true {
		return nil, status.Errorf(codes.PermissionDenied, "User not active")
	}

	user.Password = auth.HashAndSalt([]byte(req.Password))
	_, err := db.DB.Exec(ctx, `
	UPDATE users SET password = $1
	WHERE id = $2`,
		user.Password, user.ID)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.Aborted, "Error change password")
	}
	token := auth.CreateToken(user.ID)
	resp := &v1.UserResponse{User: models.UserToResponse(user),
		Token: token,
	}
	return resp, nil
}

func (s *UserServiceImpl) AdminUsers(ctx context.Context, req *v1.AdminUsersRequest) (*v1.AdminUsersResponse, error) {
	users := []models.User{}
	var total uint32
	order := "fullname"
	if req.Sort != "" {
		order = req.Sort + " " + req.Direction
	}

	err := db.DB.QueryRow(ctx, "SELECT count(*) FROM users").Scan(&total)
	query := fmt.Sprintf(
		`SELECT users.id, users.created_at, users.fullname, users.shop_name, users.shop_url,
		users.phone, users.email, users.password, users.role, users.active
		FROM users
		WHERE users.fullname ILIKE $1 OR users.phone ILIKE $1 OR users.email ILIKE $1
		ORDER BY %s OFFSET $2 LIMIT $3`,
		order)
	rows, err := db.DB.Query(ctx, query, "%"+req.Search+"%", req.Page*req.PageSize, req.PageSize)
	if err != nil {
		logger.Error(err.Error())
	}
	defer rows.Close()
	for rows.Next() {
		user := models.User{}
		err := rows.Scan(&user.ID, &user.CreatedAt, &user.Fullname, &user.ShopName, &user.ShopUrl,
			&user.Phone, &user.Email, &user.Password, &user.Role, &user.Active)
		if err != nil {
			logger.Error(err.Error())
		}
		users = append(users, user)
	}
	if err = rows.Err(); err != nil {
		return nil, status.Errorf(codes.NotFound, "Users set error")
	}
	return &v1.AdminUsersResponse{Users: models.UsersToResponse(users), Total: total}, nil
}

func (s *UserServiceImpl) AdminUser(ctx context.Context, req *v1.AdminUserRequest) (*v1.AdminUserResponse, error) {
	user := models.User{}

	err := db.DB.QueryRow(ctx,
		`SELECT users.id, users.created_at, users.fullname, users.shop_name, users.shop_url,
		users.phone, users.email, users.password, users.role, users.active
		FROM users WHERE id=$1`,
		req.Id).Scan(&user.ID, &user.CreatedAt, &user.Fullname, &user.ShopName, &user.ShopUrl,
		&user.Phone, &user.Email, &user.Password, &user.Role, &user.Active)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.NotFound, "User not exist")
	}
	return &v1.AdminUserResponse{User: models.UserToResponse(user)}, nil
}

func (s *UserServiceImpl) AdminEditUser(ctx context.Context, req *v1.AdminEditUserRequest) (*v1.AdminUserResponse, error) {
	//user_id := auth.GetUserUID(ctx)

	user := models.User{}
	user.Fullname = req.Fullname
	user.ShopName = req.ShopName
	user.ShopUrl = req.ShopUrl
	user.Phone = req.Phone
	user.Email = req.Email
	user.Role = req.Role
	user.Active = req.Active
	user.Password = auth.HashAndSalt([]byte(req.Password))

	if req.Id != 0 {
		err := db.DB.QueryRow(ctx,
			`SELECT users.id FROM users WHERE id=$1`,
			req.Id).
			Scan(&user.ID)
		if err != nil {
			return nil, status.Errorf(codes.NotFound, "User not exist")
		}
		_, err = db.DB.Exec(ctx, `
	UPDATE users SET fullname = $1, shop_name = $2, shop_url = $3, phone = $4, email = $5, role = $6,
	active = $7
	WHERE id = $8`,
			user.Fullname, user.ShopName, user.ShopUrl, user.Phone, user.Email, user.Role,
			user.Active, user.ID)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.Aborted, "Error save user")
		}
	} else {
		err := db.DB.QueryRow(ctx, `
		INSERT INTO users (fullname, shop_name, shop_url, phone, email, role, active, password)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id
		`, user.Fullname, user.ShopName, user.ShopUrl, user.Phone, user.Email, user.Role,
			user.Active, user.Password).Scan(&user.ID)
		if err != nil {
			logger.Error(err.Error())
			return nil, status.Errorf(codes.InvalidArgument, err.Error())
		}
	}
	return &v1.AdminUserResponse{User: models.UserToResponse(user)}, nil
}

func (s *UserServiceImpl) AdminDeleteUser(ctx context.Context, req *v1.AdminDeleteUserRequest) (*v1.AdminUsersResponse, error) {
	user := models.User{}

	err := db.DB.QueryRow(ctx,
		`SELECT users.id
		FROM users
		WHERE id=$1`,
		req.Id).Scan(&user.ID)
	if err != nil {
		return nil, status.Errorf(codes.NotFound, "User not exist")
	}

	_, err = db.DB.Exec(ctx, `
	DELETE FROM users
	WHERE id = $1`,
		user.ID)
	if err != nil {
		logger.Error(err.Error())
		return nil, status.Errorf(codes.Aborted, "Error delete user")
	}
	return s.AdminUsers(ctx, &v1.AdminUsersRequest{Page: req.Page, PageSize: req.PageSize, Sort: req.Sort, Direction: req.Direction})
}

// compile-type check that our new type provides the
// correct server interface
var _ v1.UserServiceServer = (*UserServiceImpl)(nil)
