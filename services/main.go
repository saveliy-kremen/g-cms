package main

import (
	"fmt"
	"net"
	"net/http"
	"os"
	"strconv"

	"google.golang.org/grpc"

	v1 "./api/v1"
	"./api/v1/services"
	"./config"
	"./packages/auth"
	"./packages/upload"
)

func main() {
	// We're not providing TLS options, so server will use plaintext.
	grpc_lis, err := net.Listen("tcp", fmt.Sprintf(":%d", config.AppConfig.Port))
	if err != nil {
		fail(err)
	}

	interceptorOpt := grpc.UnaryInterceptor(services.Interceptors())
	svr := grpc.NewServer(interceptorOpt)

	// register our service implementation
	v1.RegisterUserServiceServer(svr, &services.UserServiceImpl{})

	// trap SIGINT / SIGTERM to exit cleanly
	//c := make(chan os.Signal, 1)
	//signal.Notify(c, syscall.SIGINT)
	//signal.Notify(c, syscall.SIGTERM)
	//go func() {
	//	<-c
	//	fmt.Println("Shutting down...")
	//	svr.GracefulStop()
	//}()

	//upload server
	http.Handle("/upload/", auth.AuthMiddleware(upload.UploadFileHandler()))
	go func() {
		fmt.Printf("Upload server listening on %d\n", config.AppConfig.UploadPort)
		http.ListenAndServe(":"+strconv.Itoa(config.AppConfig.UploadPort), nil)
	}()

	// finally, run the server
	fmt.Printf("GRPC listening on %v\n", grpc_lis.Addr())
	if err := svr.Serve(grpc_lis); err != nil {
		fail(err)
	}
}

func fail(err error) {
	fmt.Fprintln(os.Stderr, err)
	os.Exit(1)
}