package main

import (
	"fmt"
	"net"
	"net/http"
	"os"
	"strconv"

	"google.golang.org/grpc"

	v1 "gcms/api/v1"

	"gcms/api/v1/services"
	"gcms/config"
	"gcms/packages/auth"
	"gcms/packages/upload"
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
	v1.RegisterAdminCategoryServiceServer(svr, &services.AdminCategoryServiceImpl{})
	v1.RegisterAdminPropertyServiceServer(svr, &services.AdminPropertyServiceImpl{})
	v1.RegisterAdminItemServiceServer(svr, &services.AdminItemServiceImpl{})
	//v1.RegisterAdminOrderServiceServer(svr, &services.AdminOrderServiceImpl{})
	v1.RegisterCategoryServiceServer(svr, &services.CategoryServiceImpl{})
	v1.RegisterPropertyServiceServer(svr, &services.PropertyServiceImpl{})
	v1.RegisterItemServiceServer(svr, &services.ItemServiceImpl{})
	v1.RegisterVendorServiceServer(svr, &services.VendorServiceImpl{})
	v1.RegisterCurrencyServiceServer(svr, &services.CurrencyServiceImpl{})
	//v1.RegisterOrderServiceServer(svr, &services.OrderServiceImpl{})
	//v1.RegisterEsp8266ServiceServer(svr, &services.Esp8266ServiceImpl{})

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
