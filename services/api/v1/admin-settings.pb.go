// Code generated by protoc-gen-go. DO NOT EDIT.
// source: admin-settings.proto

package v1

import (
	context "context"
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	empty "github.com/golang/protobuf/ptypes/empty"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

type AdminSettings struct {
	RozetkaMarkup        float64  `protobuf:"fixed64,1,opt,name=rozetka_markup,json=rozetkaMarkup,proto3" json:"rozetka_markup,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *AdminSettings) Reset()         { *m = AdminSettings{} }
func (m *AdminSettings) String() string { return proto.CompactTextString(m) }
func (*AdminSettings) ProtoMessage()    {}
func (*AdminSettings) Descriptor() ([]byte, []int) {
	return fileDescriptor_31f50ca48e7246bf, []int{0}
}

func (m *AdminSettings) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_AdminSettings.Unmarshal(m, b)
}
func (m *AdminSettings) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_AdminSettings.Marshal(b, m, deterministic)
}
func (m *AdminSettings) XXX_Merge(src proto.Message) {
	xxx_messageInfo_AdminSettings.Merge(m, src)
}
func (m *AdminSettings) XXX_Size() int {
	return xxx_messageInfo_AdminSettings.Size(m)
}
func (m *AdminSettings) XXX_DiscardUnknown() {
	xxx_messageInfo_AdminSettings.DiscardUnknown(m)
}

var xxx_messageInfo_AdminSettings proto.InternalMessageInfo

func (m *AdminSettings) GetRozetkaMarkup() float64 {
	if m != nil {
		return m.RozetkaMarkup
	}
	return 0
}

type AdminEditSettingsRequest struct {
	RozetkaMarkup        float64  `protobuf:"fixed64,1,opt,name=rozetka_markup,json=rozetkaMarkup,proto3" json:"rozetka_markup,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *AdminEditSettingsRequest) Reset()         { *m = AdminEditSettingsRequest{} }
func (m *AdminEditSettingsRequest) String() string { return proto.CompactTextString(m) }
func (*AdminEditSettingsRequest) ProtoMessage()    {}
func (*AdminEditSettingsRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_31f50ca48e7246bf, []int{1}
}

func (m *AdminEditSettingsRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_AdminEditSettingsRequest.Unmarshal(m, b)
}
func (m *AdminEditSettingsRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_AdminEditSettingsRequest.Marshal(b, m, deterministic)
}
func (m *AdminEditSettingsRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_AdminEditSettingsRequest.Merge(m, src)
}
func (m *AdminEditSettingsRequest) XXX_Size() int {
	return xxx_messageInfo_AdminEditSettingsRequest.Size(m)
}
func (m *AdminEditSettingsRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_AdminEditSettingsRequest.DiscardUnknown(m)
}

var xxx_messageInfo_AdminEditSettingsRequest proto.InternalMessageInfo

func (m *AdminEditSettingsRequest) GetRozetkaMarkup() float64 {
	if m != nil {
		return m.RozetkaMarkup
	}
	return 0
}

type AdminSettingsResponse struct {
	Settings             *AdminSettings `protobuf:"bytes,1,opt,name=settings,proto3" json:"settings,omitempty"`
	XXX_NoUnkeyedLiteral struct{}       `json:"-"`
	XXX_unrecognized     []byte         `json:"-"`
	XXX_sizecache        int32          `json:"-"`
}

func (m *AdminSettingsResponse) Reset()         { *m = AdminSettingsResponse{} }
func (m *AdminSettingsResponse) String() string { return proto.CompactTextString(m) }
func (*AdminSettingsResponse) ProtoMessage()    {}
func (*AdminSettingsResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_31f50ca48e7246bf, []int{2}
}

func (m *AdminSettingsResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_AdminSettingsResponse.Unmarshal(m, b)
}
func (m *AdminSettingsResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_AdminSettingsResponse.Marshal(b, m, deterministic)
}
func (m *AdminSettingsResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_AdminSettingsResponse.Merge(m, src)
}
func (m *AdminSettingsResponse) XXX_Size() int {
	return xxx_messageInfo_AdminSettingsResponse.Size(m)
}
func (m *AdminSettingsResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_AdminSettingsResponse.DiscardUnknown(m)
}

var xxx_messageInfo_AdminSettingsResponse proto.InternalMessageInfo

func (m *AdminSettingsResponse) GetSettings() *AdminSettings {
	if m != nil {
		return m.Settings
	}
	return nil
}

func init() {
	proto.RegisterType((*AdminSettings)(nil), "v1.AdminSettings")
	proto.RegisterType((*AdminEditSettingsRequest)(nil), "v1.AdminEditSettingsRequest")
	proto.RegisterType((*AdminSettingsResponse)(nil), "v1.AdminSettingsResponse")
}

func init() {
	proto.RegisterFile("admin-settings.proto", fileDescriptor_31f50ca48e7246bf)
}

var fileDescriptor_31f50ca48e7246bf = []byte{
	// 223 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0x12, 0x49, 0x4c, 0xc9, 0xcd,
	0xcc, 0xd3, 0x2d, 0x4e, 0x2d, 0x29, 0xc9, 0xcc, 0x4b, 0x2f, 0xd6, 0x2b, 0x28, 0xca, 0x2f, 0xc9,
	0x17, 0x62, 0x2a, 0x33, 0x94, 0x92, 0x4e, 0xcf, 0xcf, 0x4f, 0xcf, 0x49, 0xd5, 0x07, 0x8b, 0x24,
	0x95, 0xa6, 0xe9, 0xa7, 0xe6, 0x16, 0x94, 0x54, 0x42, 0x14, 0x28, 0x99, 0x71, 0xf1, 0x3a, 0x82,
	0x34, 0x06, 0x43, 0xf5, 0x09, 0xa9, 0x72, 0xf1, 0x15, 0xe5, 0x57, 0xa5, 0x96, 0x64, 0x27, 0xc6,
	0xe7, 0x26, 0x16, 0x65, 0x97, 0x16, 0x48, 0x30, 0x2a, 0x30, 0x6a, 0x30, 0x06, 0xf1, 0x42, 0x45,
	0x7d, 0xc1, 0x82, 0x4a, 0x8e, 0x5c, 0x12, 0x60, 0x7d, 0xae, 0x29, 0x99, 0x25, 0x30, 0xbd, 0x41,
	0xa9, 0x85, 0xa5, 0xa9, 0xc5, 0x25, 0xc4, 0x1a, 0xe1, 0xc6, 0x25, 0x8a, 0x62, 0x75, 0x50, 0x6a,
	0x71, 0x41, 0x7e, 0x5e, 0x71, 0xaa, 0x90, 0x2e, 0x17, 0x07, 0xcc, 0x1b, 0x60, 0x9d, 0xdc, 0x46,
	0x82, 0x7a, 0x65, 0x86, 0x7a, 0xa8, 0x8a, 0xe1, 0x4a, 0x8c, 0x56, 0x30, 0x72, 0x89, 0xa0, 0xc8,
	0x05, 0xa7, 0x16, 0x95, 0x65, 0x26, 0xa7, 0x0a, 0x39, 0xa1, 0xfb, 0x4d, 0x4c, 0x0f, 0x12, 0x14,
	0x7a, 0xb0, 0xa0, 0xd0, 0x73, 0x05, 0x05, 0x85, 0x94, 0x24, 0xa6, 0xf1, 0x30, 0xb7, 0xf8, 0x70,
	0x09, 0x62, 0xf8, 0x53, 0x48, 0x06, 0xae, 0x1e, 0x8b, 0xf7, 0xf1, 0x98, 0x96, 0xc4, 0x06, 0xb6,
	0xd8, 0x18, 0x10, 0x00, 0x00, 0xff, 0xff, 0x29, 0xb7, 0x6b, 0x6c, 0xad, 0x01, 0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConnInterface

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion6

// AdminSettingsServiceClient is the client API for AdminSettingsService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type AdminSettingsServiceClient interface {
	AdminSettings(ctx context.Context, in *empty.Empty, opts ...grpc.CallOption) (*AdminSettingsResponse, error)
	AdminEditSettings(ctx context.Context, in *AdminEditSettingsRequest, opts ...grpc.CallOption) (*AdminSettingsResponse, error)
}

type adminSettingsServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewAdminSettingsServiceClient(cc grpc.ClientConnInterface) AdminSettingsServiceClient {
	return &adminSettingsServiceClient{cc}
}

func (c *adminSettingsServiceClient) AdminSettings(ctx context.Context, in *empty.Empty, opts ...grpc.CallOption) (*AdminSettingsResponse, error) {
	out := new(AdminSettingsResponse)
	err := c.cc.Invoke(ctx, "/v1.AdminSettingsService/AdminSettings", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *adminSettingsServiceClient) AdminEditSettings(ctx context.Context, in *AdminEditSettingsRequest, opts ...grpc.CallOption) (*AdminSettingsResponse, error) {
	out := new(AdminSettingsResponse)
	err := c.cc.Invoke(ctx, "/v1.AdminSettingsService/AdminEditSettings", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// AdminSettingsServiceServer is the server API for AdminSettingsService service.
type AdminSettingsServiceServer interface {
	AdminSettings(context.Context, *empty.Empty) (*AdminSettingsResponse, error)
	AdminEditSettings(context.Context, *AdminEditSettingsRequest) (*AdminSettingsResponse, error)
}

// UnimplementedAdminSettingsServiceServer can be embedded to have forward compatible implementations.
type UnimplementedAdminSettingsServiceServer struct {
}

func (*UnimplementedAdminSettingsServiceServer) AdminSettings(ctx context.Context, req *empty.Empty) (*AdminSettingsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AdminSettings not implemented")
}
func (*UnimplementedAdminSettingsServiceServer) AdminEditSettings(ctx context.Context, req *AdminEditSettingsRequest) (*AdminSettingsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AdminEditSettings not implemented")
}

func RegisterAdminSettingsServiceServer(s *grpc.Server, srv AdminSettingsServiceServer) {
	s.RegisterService(&_AdminSettingsService_serviceDesc, srv)
}

func _AdminSettingsService_AdminSettings_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(empty.Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AdminSettingsServiceServer).AdminSettings(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/v1.AdminSettingsService/AdminSettings",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AdminSettingsServiceServer).AdminSettings(ctx, req.(*empty.Empty))
	}
	return interceptor(ctx, in, info, handler)
}

func _AdminSettingsService_AdminEditSettings_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(AdminEditSettingsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AdminSettingsServiceServer).AdminEditSettings(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/v1.AdminSettingsService/AdminEditSettings",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AdminSettingsServiceServer).AdminEditSettings(ctx, req.(*AdminEditSettingsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _AdminSettingsService_serviceDesc = grpc.ServiceDesc{
	ServiceName: "v1.AdminSettingsService",
	HandlerType: (*AdminSettingsServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "AdminSettings",
			Handler:    _AdminSettingsService_AdminSettings_Handler,
		},
		{
			MethodName: "AdminEditSettings",
			Handler:    _AdminSettingsService_AdminEditSettings_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "admin-settings.proto",
}
