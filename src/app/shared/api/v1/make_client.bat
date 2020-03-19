@echo Compiling proto file(s)...

for %%f in (proto\*.proto) do protoc -I=proto --js_out=import_style=commonjs,binary:./ --grpc-web_out=import_style=typescript,mode=grpcwebtext:./ %%f
for %%f in (c:\protoc\include\google\protobuf\*.proto) do protoc -Ic:\protoc\include\  --js_out=import_style=commonjs:./ %%f

@echo Done

