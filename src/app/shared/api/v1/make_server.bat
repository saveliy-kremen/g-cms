REM first we install the protoc-gen-go plugin
REM go get github.com/golang/protobuf/protoc-gen-go
REM now we can invoke protoc
REM protoc --go_out=plugins=grpc:. ./proto/sfapi.proto

@echo Compiling proto file(s)...

for %%f in (proto\*.proto) do protoc -I=proto  --go_out=plugins=grpc:../../../../../services/api/v1/ %%f

@echo Done
