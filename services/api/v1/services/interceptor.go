package services

import (
	"context"
	"errors"
	"strconv"
	"strings"

	jwt "github.com/dgrijalva/jwt-go"
	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"

	"../../../config"
	"../../../packages/auth"
	"../../../packages/utils"
)

// AuthTokenKey is the key used within our metadata to store a JWT
const AuthTokenKey = "authentication"

var jwtKey = []byte(config.AppConfig.JWTKey)

var (
	errGrpcUnauthenticated = grpc.Errorf(codes.Unauthenticated, "missing authentication token")
)

// Interceptors implements the grpc.UnaryServerInteceptor function to add
// interceptors around all gRPC calls
func Interceptors() grpc.UnaryServerInterceptor {
	return grpc_middleware.ChainUnaryServer(
		AuthenticationInterceptor,
	)
}

// AuthenticationInterceptor validates a JWT token and appends the username to the
// context that is passed to the handler
func AuthenticationInterceptor(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (out interface{}, err error) {
	methodParts := strings.Split(info.FullMethod, "/")
	exceptions := []string{"Auth", "Register"}
	_, found := utils.Find(exceptions, methodParts[len(methodParts)-1])
	if found {
		return handler(ctx, req)
	}

	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, errGrpcUnauthenticated
	}

	tokenString, ok := md["authorization"]
	if !ok || len(tokenString) < 1 || len(tokenString[0]) < 8 {
		return nil, errGrpcUnauthenticated
	}

	claims := &auth.Claims{}
	token, err := jwt.ParseWithClaims(tokenString[0][7:], claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		return nil, err
	}

	userID := claims.UserID

	// load userID into context
	authContext := auth.AuthContext{
		UserID: userID,
	}

	if token.Valid {
		ctx = context.WithValue(ctx, auth.UserAuthKey, authContext)
	} else {
		return nil, errGrpcUnauthenticated
	}

	return handler(ctx, req)
}

func GetUserIDFromMetadata(ctx context.Context) (*uint, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, errors.New("Not found metadata")
	}

	tokenString, ok := md["authorization"]
	if !ok || len(tokenString) < 1 || len(tokenString[0]) < 8 {
		return nil, errGrpcUnauthenticated
	}

	claims := &auth.Claims{}
	_, err := jwt.ParseWithClaims(tokenString[0][7:], claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		return nil, err
	}

	claimUserID := claims.UserID
	id, _ := strconv.Atoi(claimUserID)
	userID := uint(id)
	return &userID, nil
}
