@echo Compiling client proto file(s)...

for %%f in (proto\*.proto) do protoc -I=proto --js_out=import_style=commonjs:./ %%f
for %%f in (c:\protoc\include\google\protobuf\*.proto) do protoc -Ic:\protoc\include\  --js_out=import_style=commonjs:./ %%f

@echo Done

@echo Compiling server proto file(s)...

for %%f in (proto\*.proto) do protoc -I=proto  --go_out=plugins=grpc:../../../../../services/api/v1/ %%f

@echo Done