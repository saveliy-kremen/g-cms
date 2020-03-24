// Code generated by protoc-gen-go. DO NOT EDIT.
// source: category.proto

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

type State struct {
	Disabled             bool     `protobuf:"varint,1,opt,name=disabled,proto3" json:"disabled,omitempty"`
	Opened               bool     `protobuf:"varint,2,opt,name=opened,proto3" json:"opened,omitempty"`
	Selected             bool     `protobuf:"varint,3,opt,name=selected,proto3" json:"selected,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *State) Reset()         { *m = State{} }
func (m *State) String() string { return proto.CompactTextString(m) }
func (*State) ProtoMessage()    {}
func (*State) Descriptor() ([]byte, []int) {
	return fileDescriptor_1c6ef5ed29d8d1a1, []int{0}
}

func (m *State) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_State.Unmarshal(m, b)
}
func (m *State) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_State.Marshal(b, m, deterministic)
}
func (m *State) XXX_Merge(src proto.Message) {
	xxx_messageInfo_State.Merge(m, src)
}
func (m *State) XXX_Size() int {
	return xxx_messageInfo_State.Size(m)
}
func (m *State) XXX_DiscardUnknown() {
	xxx_messageInfo_State.DiscardUnknown(m)
}

var xxx_messageInfo_State proto.InternalMessageInfo

func (m *State) GetDisabled() bool {
	if m != nil {
		return m.Disabled
	}
	return false
}

func (m *State) GetOpened() bool {
	if m != nil {
		return m.Opened
	}
	return false
}

func (m *State) GetSelected() bool {
	if m != nil {
		return m.Selected
	}
	return false
}

type Category struct {
	Id                   string   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	UserID               uint32   `protobuf:"varint,2,opt,name=userID,proto3" json:"userID,omitempty"`
	Text                 string   `protobuf:"bytes,3,opt,name=text,proto3" json:"text,omitempty"`
	Alias                string   `protobuf:"bytes,4,opt,name=alias,proto3" json:"alias,omitempty"`
	Description          string   `protobuf:"bytes,5,opt,name=description,proto3" json:"description,omitempty"`
	Image                string   `protobuf:"bytes,6,opt,name=image,proto3" json:"image,omitempty"`
	Parent               string   `protobuf:"bytes,7,opt,name=parent,proto3" json:"parent,omitempty"`
	Sort                 uint32   `protobuf:"varint,8,opt,name=sort,proto3" json:"sort,omitempty"`
	State                *State   `protobuf:"bytes,9,opt,name=state,proto3" json:"state,omitempty"`
	SeoTitle             string   `protobuf:"bytes,10,opt,name=seoTitle,proto3" json:"seoTitle,omitempty"`
	SeoDescription       string   `protobuf:"bytes,11,opt,name=seoDescription,proto3" json:"seoDescription,omitempty"`
	SeoKeywords          string   `protobuf:"bytes,12,opt,name=seoKeywords,proto3" json:"seoKeywords,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *Category) Reset()         { *m = Category{} }
func (m *Category) String() string { return proto.CompactTextString(m) }
func (*Category) ProtoMessage()    {}
func (*Category) Descriptor() ([]byte, []int) {
	return fileDescriptor_1c6ef5ed29d8d1a1, []int{1}
}

func (m *Category) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Category.Unmarshal(m, b)
}
func (m *Category) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Category.Marshal(b, m, deterministic)
}
func (m *Category) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Category.Merge(m, src)
}
func (m *Category) XXX_Size() int {
	return xxx_messageInfo_Category.Size(m)
}
func (m *Category) XXX_DiscardUnknown() {
	xxx_messageInfo_Category.DiscardUnknown(m)
}

var xxx_messageInfo_Category proto.InternalMessageInfo

func (m *Category) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

func (m *Category) GetUserID() uint32 {
	if m != nil {
		return m.UserID
	}
	return 0
}

func (m *Category) GetText() string {
	if m != nil {
		return m.Text
	}
	return ""
}

func (m *Category) GetAlias() string {
	if m != nil {
		return m.Alias
	}
	return ""
}

func (m *Category) GetDescription() string {
	if m != nil {
		return m.Description
	}
	return ""
}

func (m *Category) GetImage() string {
	if m != nil {
		return m.Image
	}
	return ""
}

func (m *Category) GetParent() string {
	if m != nil {
		return m.Parent
	}
	return ""
}

func (m *Category) GetSort() uint32 {
	if m != nil {
		return m.Sort
	}
	return 0
}

func (m *Category) GetState() *State {
	if m != nil {
		return m.State
	}
	return nil
}

func (m *Category) GetSeoTitle() string {
	if m != nil {
		return m.SeoTitle
	}
	return ""
}

func (m *Category) GetSeoDescription() string {
	if m != nil {
		return m.SeoDescription
	}
	return ""
}

func (m *Category) GetSeoKeywords() string {
	if m != nil {
		return m.SeoKeywords
	}
	return ""
}

type AddCategoryRequest struct {
	Id                   string   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Parent               string   `protobuf:"bytes,2,opt,name=parent,proto3" json:"parent,omitempty"`
	Text                 string   `protobuf:"bytes,3,opt,name=text,proto3" json:"text,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *AddCategoryRequest) Reset()         { *m = AddCategoryRequest{} }
func (m *AddCategoryRequest) String() string { return proto.CompactTextString(m) }
func (*AddCategoryRequest) ProtoMessage()    {}
func (*AddCategoryRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_1c6ef5ed29d8d1a1, []int{2}
}

func (m *AddCategoryRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_AddCategoryRequest.Unmarshal(m, b)
}
func (m *AddCategoryRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_AddCategoryRequest.Marshal(b, m, deterministic)
}
func (m *AddCategoryRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_AddCategoryRequest.Merge(m, src)
}
func (m *AddCategoryRequest) XXX_Size() int {
	return xxx_messageInfo_AddCategoryRequest.Size(m)
}
func (m *AddCategoryRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_AddCategoryRequest.DiscardUnknown(m)
}

var xxx_messageInfo_AddCategoryRequest proto.InternalMessageInfo

func (m *AddCategoryRequest) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

func (m *AddCategoryRequest) GetParent() string {
	if m != nil {
		return m.Parent
	}
	return ""
}

func (m *AddCategoryRequest) GetText() string {
	if m != nil {
		return m.Text
	}
	return ""
}

type DeleteCategoryRequest struct {
	Id                   string   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *DeleteCategoryRequest) Reset()         { *m = DeleteCategoryRequest{} }
func (m *DeleteCategoryRequest) String() string { return proto.CompactTextString(m) }
func (*DeleteCategoryRequest) ProtoMessage()    {}
func (*DeleteCategoryRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_1c6ef5ed29d8d1a1, []int{3}
}

func (m *DeleteCategoryRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_DeleteCategoryRequest.Unmarshal(m, b)
}
func (m *DeleteCategoryRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_DeleteCategoryRequest.Marshal(b, m, deterministic)
}
func (m *DeleteCategoryRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_DeleteCategoryRequest.Merge(m, src)
}
func (m *DeleteCategoryRequest) XXX_Size() int {
	return xxx_messageInfo_DeleteCategoryRequest.Size(m)
}
func (m *DeleteCategoryRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_DeleteCategoryRequest.DiscardUnknown(m)
}

var xxx_messageInfo_DeleteCategoryRequest proto.InternalMessageInfo

func (m *DeleteCategoryRequest) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

type MoveCategoryRequest struct {
	Id                   string   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Parent               string   `protobuf:"bytes,2,opt,name=parent,proto3" json:"parent,omitempty"`
	Position             uint32   `protobuf:"varint,3,opt,name=position,proto3" json:"position,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *MoveCategoryRequest) Reset()         { *m = MoveCategoryRequest{} }
func (m *MoveCategoryRequest) String() string { return proto.CompactTextString(m) }
func (*MoveCategoryRequest) ProtoMessage()    {}
func (*MoveCategoryRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_1c6ef5ed29d8d1a1, []int{4}
}

func (m *MoveCategoryRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_MoveCategoryRequest.Unmarshal(m, b)
}
func (m *MoveCategoryRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_MoveCategoryRequest.Marshal(b, m, deterministic)
}
func (m *MoveCategoryRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MoveCategoryRequest.Merge(m, src)
}
func (m *MoveCategoryRequest) XXX_Size() int {
	return xxx_messageInfo_MoveCategoryRequest.Size(m)
}
func (m *MoveCategoryRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_MoveCategoryRequest.DiscardUnknown(m)
}

var xxx_messageInfo_MoveCategoryRequest proto.InternalMessageInfo

func (m *MoveCategoryRequest) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

func (m *MoveCategoryRequest) GetParent() string {
	if m != nil {
		return m.Parent
	}
	return ""
}

func (m *MoveCategoryRequest) GetPosition() uint32 {
	if m != nil {
		return m.Position
	}
	return 0
}

type CategoriesResponse struct {
	Categories           []*Category `protobuf:"bytes,1,rep,name=categories,proto3" json:"categories,omitempty"`
	XXX_NoUnkeyedLiteral struct{}    `json:"-"`
	XXX_unrecognized     []byte      `json:"-"`
	XXX_sizecache        int32       `json:"-"`
}

func (m *CategoriesResponse) Reset()         { *m = CategoriesResponse{} }
func (m *CategoriesResponse) String() string { return proto.CompactTextString(m) }
func (*CategoriesResponse) ProtoMessage()    {}
func (*CategoriesResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_1c6ef5ed29d8d1a1, []int{5}
}

func (m *CategoriesResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_CategoriesResponse.Unmarshal(m, b)
}
func (m *CategoriesResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_CategoriesResponse.Marshal(b, m, deterministic)
}
func (m *CategoriesResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_CategoriesResponse.Merge(m, src)
}
func (m *CategoriesResponse) XXX_Size() int {
	return xxx_messageInfo_CategoriesResponse.Size(m)
}
func (m *CategoriesResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_CategoriesResponse.DiscardUnknown(m)
}

var xxx_messageInfo_CategoriesResponse proto.InternalMessageInfo

func (m *CategoriesResponse) GetCategories() []*Category {
	if m != nil {
		return m.Categories
	}
	return nil
}

func init() {
	proto.RegisterType((*State)(nil), "v1.State")
	proto.RegisterType((*Category)(nil), "v1.Category")
	proto.RegisterType((*AddCategoryRequest)(nil), "v1.AddCategoryRequest")
	proto.RegisterType((*DeleteCategoryRequest)(nil), "v1.DeleteCategoryRequest")
	proto.RegisterType((*MoveCategoryRequest)(nil), "v1.MoveCategoryRequest")
	proto.RegisterType((*CategoriesResponse)(nil), "v1.CategoriesResponse")
}

func init() {
	proto.RegisterFile("category.proto", fileDescriptor_1c6ef5ed29d8d1a1)
}

var fileDescriptor_1c6ef5ed29d8d1a1 = []byte{
	// 485 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x9c, 0x52, 0xc1, 0x8e, 0x12, 0x41,
	0x10, 0x0d, 0xc3, 0x82, 0x50, 0x20, 0x6a, 0xa9, 0xd8, 0xe2, 0x41, 0x32, 0x07, 0xe5, 0x60, 0x66,
	0xb3, 0x78, 0xd5, 0x98, 0x65, 0xf1, 0x60, 0x8c, 0x89, 0x99, 0x35, 0x31, 0x1e, 0x87, 0x99, 0x82,
	0x74, 0x32, 0x4b, 0x8f, 0xdd, 0x0d, 0xba, 0x1f, 0xe3, 0xf7, 0xf8, 0x5b, 0xa6, 0x6b, 0x86, 0xb1,
	0x45, 0x88, 0x71, 0x6f, 0xfd, 0x5e, 0x55, 0xbd, 0xaa, 0x7a, 0x5d, 0x30, 0x48, 0x13, 0x4b, 0x2b,
	0xa5, 0xaf, 0xa3, 0x42, 0x2b, 0xab, 0x30, 0xd8, 0x9e, 0x8d, 0x9e, 0xac, 0x94, 0x5a, 0xe5, 0x74,
	0xca, 0xcc, 0x62, 0xb3, 0x3c, 0xa5, 0xab, 0xc2, 0x56, 0x09, 0xe1, 0x67, 0x68, 0x5d, 0xda, 0xc4,
	0x12, 0x8e, 0xa0, 0x93, 0x49, 0x93, 0x2c, 0x72, 0xca, 0x44, 0x63, 0xdc, 0x98, 0x74, 0xe2, 0x1a,
	0xe3, 0x10, 0xda, 0xaa, 0xa0, 0x35, 0x65, 0x22, 0xe0, 0x48, 0x85, 0x5c, 0x8d, 0xa1, 0x9c, 0x52,
	0x4b, 0x99, 0x68, 0x96, 0x35, 0x3b, 0x1c, 0xfe, 0x0c, 0xa0, 0x73, 0x51, 0x0d, 0x83, 0x03, 0x08,
	0x64, 0x29, 0xdb, 0x8d, 0x03, 0xc9, 0x82, 0x1b, 0x43, 0xfa, 0xdd, 0x9c, 0x05, 0x6f, 0xc7, 0x15,
	0x42, 0x84, 0x13, 0x4b, 0xdf, 0x2d, 0x8b, 0x75, 0x63, 0x7e, 0xe3, 0x03, 0x68, 0x25, 0xb9, 0x4c,
	0x8c, 0x38, 0x61, 0xb2, 0x04, 0x38, 0x86, 0x5e, 0x46, 0x26, 0xd5, 0xb2, 0xb0, 0x52, 0xad, 0x45,
	0x8b, 0x63, 0x3e, 0xe5, 0xea, 0xe4, 0x55, 0xb2, 0x22, 0xd1, 0x2e, 0xeb, 0x18, 0xb8, 0xce, 0x45,
	0xa2, 0x69, 0x6d, 0xc5, 0x2d, 0xa6, 0x2b, 0xe4, 0x3a, 0x1b, 0xa5, 0xad, 0xe8, 0xf0, 0x3c, 0xfc,
	0xc6, 0xa7, 0xd0, 0x32, 0xce, 0x1b, 0xd1, 0x1d, 0x37, 0x26, 0xbd, 0x69, 0x37, 0xda, 0x9e, 0x45,
	0x6c, 0x56, 0x5c, 0xf2, 0xe5, 0xfe, 0xea, 0x93, 0xb4, 0x39, 0x09, 0x60, 0xb9, 0x1a, 0xe3, 0x33,
	0x18, 0x18, 0x52, 0x73, 0x6f, 0xc6, 0x1e, 0x67, 0xec, 0xb1, 0x6e, 0x11, 0x43, 0xea, 0x3d, 0x5d,
	0x7f, 0x53, 0x3a, 0x33, 0xa2, 0x5f, 0x2e, 0xe2, 0x51, 0xe1, 0x47, 0xc0, 0xf3, 0x2c, 0xdb, 0x79,
	0x19, 0xd3, 0xd7, 0x0d, 0x19, 0x7b, 0xc8, 0xd2, 0x6a, 0xb1, 0x60, 0x7f, 0xb1, 0x7d, 0x4b, 0xc3,
	0xe7, 0xf0, 0x70, 0x4e, 0x39, 0x59, 0xfa, 0x87, 0x68, 0xf8, 0x05, 0xee, 0x7f, 0x50, 0x5b, 0xba,
	0x69, 0xef, 0x11, 0x74, 0x0a, 0x65, 0x24, 0x6f, 0xdf, 0x64, 0x63, 0x6b, 0x1c, 0xce, 0x00, 0x2b,
	0x59, 0x49, 0x26, 0x26, 0x53, 0xa8, 0xb5, 0x21, 0x7c, 0x01, 0x90, 0xd6, 0xac, 0x68, 0x8c, 0x9b,
	0x93, 0xde, 0xb4, 0xef, 0x7c, 0xaf, 0x47, 0xf0, 0xe2, 0xd3, 0x1f, 0x4d, 0xb8, 0xb3, 0x0b, 0x5c,
	0x92, 0xde, 0xca, 0x94, 0xf0, 0x15, 0xc0, 0x6f, 0x5d, 0x1c, 0x46, 0xe5, 0xf1, 0x47, 0xbb, 0xe3,
	0x8f, 0xde, 0xba, 0xe3, 0x1f, 0x0d, 0x3d, 0x4d, 0xbf, 0xff, 0x6b, 0xe8, 0x79, 0x5e, 0x23, 0xa7,
	0xfd, 0x6d, 0xfe, 0xd1, 0xf2, 0x0b, 0xb8, 0xe7, 0x65, 0xcf, 0x68, 0xa9, 0x34, 0xfd, 0xb7, 0xc8,
	0x0c, 0xee, 0x7a, 0xd9, 0xe7, 0x4b, 0x4b, 0xfa, 0x06, 0x83, 0x0c, 0xfe, 0xfc, 0x61, 0x7c, 0xec,
	0x32, 0x0f, 0xfe, 0xfa, 0x51, 0x91, 0x37, 0xd0, 0xf7, 0x7f, 0x1f, 0x1f, 0xb9, 0xbc, 0x03, 0xf7,
	0x70, 0x4c, 0x60, 0xd1, 0x66, 0xd7, 0x5f, 0xfe, 0x0a, 0x00, 0x00, 0xff, 0xff, 0xa5, 0x2e, 0x49,
	0x03, 0x96, 0x04, 0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConnInterface

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion6

// CategoryServiceClient is the client API for CategoryService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type CategoryServiceClient interface {
	Categories(ctx context.Context, in *empty.Empty, opts ...grpc.CallOption) (*CategoriesResponse, error)
	AddCategory(ctx context.Context, in *AddCategoryRequest, opts ...grpc.CallOption) (*CategoriesResponse, error)
	AddCategoryBefore(ctx context.Context, in *AddCategoryRequest, opts ...grpc.CallOption) (*CategoriesResponse, error)
	AddCategoryAfter(ctx context.Context, in *AddCategoryRequest, opts ...grpc.CallOption) (*CategoriesResponse, error)
	DeleteCategory(ctx context.Context, in *DeleteCategoryRequest, opts ...grpc.CallOption) (*CategoriesResponse, error)
	MoveCategory(ctx context.Context, in *MoveCategoryRequest, opts ...grpc.CallOption) (*CategoriesResponse, error)
}

type categoryServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewCategoryServiceClient(cc grpc.ClientConnInterface) CategoryServiceClient {
	return &categoryServiceClient{cc}
}

func (c *categoryServiceClient) Categories(ctx context.Context, in *empty.Empty, opts ...grpc.CallOption) (*CategoriesResponse, error) {
	out := new(CategoriesResponse)
	err := c.cc.Invoke(ctx, "/v1.CategoryService/Categories", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *categoryServiceClient) AddCategory(ctx context.Context, in *AddCategoryRequest, opts ...grpc.CallOption) (*CategoriesResponse, error) {
	out := new(CategoriesResponse)
	err := c.cc.Invoke(ctx, "/v1.CategoryService/AddCategory", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *categoryServiceClient) AddCategoryBefore(ctx context.Context, in *AddCategoryRequest, opts ...grpc.CallOption) (*CategoriesResponse, error) {
	out := new(CategoriesResponse)
	err := c.cc.Invoke(ctx, "/v1.CategoryService/AddCategoryBefore", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *categoryServiceClient) AddCategoryAfter(ctx context.Context, in *AddCategoryRequest, opts ...grpc.CallOption) (*CategoriesResponse, error) {
	out := new(CategoriesResponse)
	err := c.cc.Invoke(ctx, "/v1.CategoryService/AddCategoryAfter", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *categoryServiceClient) DeleteCategory(ctx context.Context, in *DeleteCategoryRequest, opts ...grpc.CallOption) (*CategoriesResponse, error) {
	out := new(CategoriesResponse)
	err := c.cc.Invoke(ctx, "/v1.CategoryService/DeleteCategory", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *categoryServiceClient) MoveCategory(ctx context.Context, in *MoveCategoryRequest, opts ...grpc.CallOption) (*CategoriesResponse, error) {
	out := new(CategoriesResponse)
	err := c.cc.Invoke(ctx, "/v1.CategoryService/MoveCategory", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// CategoryServiceServer is the server API for CategoryService service.
type CategoryServiceServer interface {
	Categories(context.Context, *empty.Empty) (*CategoriesResponse, error)
	AddCategory(context.Context, *AddCategoryRequest) (*CategoriesResponse, error)
	AddCategoryBefore(context.Context, *AddCategoryRequest) (*CategoriesResponse, error)
	AddCategoryAfter(context.Context, *AddCategoryRequest) (*CategoriesResponse, error)
	DeleteCategory(context.Context, *DeleteCategoryRequest) (*CategoriesResponse, error)
	MoveCategory(context.Context, *MoveCategoryRequest) (*CategoriesResponse, error)
}

// UnimplementedCategoryServiceServer can be embedded to have forward compatible implementations.
type UnimplementedCategoryServiceServer struct {
}

func (*UnimplementedCategoryServiceServer) Categories(ctx context.Context, req *empty.Empty) (*CategoriesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Categories not implemented")
}
func (*UnimplementedCategoryServiceServer) AddCategory(ctx context.Context, req *AddCategoryRequest) (*CategoriesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AddCategory not implemented")
}
func (*UnimplementedCategoryServiceServer) AddCategoryBefore(ctx context.Context, req *AddCategoryRequest) (*CategoriesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AddCategoryBefore not implemented")
}
func (*UnimplementedCategoryServiceServer) AddCategoryAfter(ctx context.Context, req *AddCategoryRequest) (*CategoriesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AddCategoryAfter not implemented")
}
func (*UnimplementedCategoryServiceServer) DeleteCategory(ctx context.Context, req *DeleteCategoryRequest) (*CategoriesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DeleteCategory not implemented")
}
func (*UnimplementedCategoryServiceServer) MoveCategory(ctx context.Context, req *MoveCategoryRequest) (*CategoriesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method MoveCategory not implemented")
}

func RegisterCategoryServiceServer(s *grpc.Server, srv CategoryServiceServer) {
	s.RegisterService(&_CategoryService_serviceDesc, srv)
}

func _CategoryService_Categories_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(empty.Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CategoryServiceServer).Categories(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/v1.CategoryService/Categories",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CategoryServiceServer).Categories(ctx, req.(*empty.Empty))
	}
	return interceptor(ctx, in, info, handler)
}

func _CategoryService_AddCategory_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(AddCategoryRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CategoryServiceServer).AddCategory(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/v1.CategoryService/AddCategory",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CategoryServiceServer).AddCategory(ctx, req.(*AddCategoryRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _CategoryService_AddCategoryBefore_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(AddCategoryRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CategoryServiceServer).AddCategoryBefore(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/v1.CategoryService/AddCategoryBefore",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CategoryServiceServer).AddCategoryBefore(ctx, req.(*AddCategoryRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _CategoryService_AddCategoryAfter_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(AddCategoryRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CategoryServiceServer).AddCategoryAfter(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/v1.CategoryService/AddCategoryAfter",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CategoryServiceServer).AddCategoryAfter(ctx, req.(*AddCategoryRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _CategoryService_DeleteCategory_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(DeleteCategoryRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CategoryServiceServer).DeleteCategory(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/v1.CategoryService/DeleteCategory",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CategoryServiceServer).DeleteCategory(ctx, req.(*DeleteCategoryRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _CategoryService_MoveCategory_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MoveCategoryRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CategoryServiceServer).MoveCategory(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/v1.CategoryService/MoveCategory",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CategoryServiceServer).MoveCategory(ctx, req.(*MoveCategoryRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _CategoryService_serviceDesc = grpc.ServiceDesc{
	ServiceName: "v1.CategoryService",
	HandlerType: (*CategoryServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Categories",
			Handler:    _CategoryService_Categories_Handler,
		},
		{
			MethodName: "AddCategory",
			Handler:    _CategoryService_AddCategory_Handler,
		},
		{
			MethodName: "AddCategoryBefore",
			Handler:    _CategoryService_AddCategoryBefore_Handler,
		},
		{
			MethodName: "AddCategoryAfter",
			Handler:    _CategoryService_AddCategoryAfter_Handler,
		},
		{
			MethodName: "DeleteCategory",
			Handler:    _CategoryService_DeleteCategory_Handler,
		},
		{
			MethodName: "MoveCategory",
			Handler:    _CategoryService_MoveCategory_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "category.proto",
}
