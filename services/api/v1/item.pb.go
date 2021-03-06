// Code generated by protoc-gen-go. DO NOT EDIT.
// source: item.proto

package v1

import (
	context "context"
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	_ "github.com/golang/protobuf/ptypes/empty"
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

type Item struct {
	Id                   string       `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	UserId               uint32       `protobuf:"varint,2,opt,name=user_id,json=userId,proto3" json:"user_id,omitempty"`
	ParentId             uint64       `protobuf:"varint,4,opt,name=parent_id,json=parentId,proto3" json:"parent_id,omitempty"`
	CategoryId           uint32       `protobuf:"varint,5,opt,name=category_id,json=categoryId,proto3" json:"category_id,omitempty"`
	Title                string       `protobuf:"bytes,6,opt,name=title,proto3" json:"title,omitempty"`
	Article              string       `protobuf:"bytes,7,opt,name=article,proto3" json:"article,omitempty"`
	Alias                string       `protobuf:"bytes,8,opt,name=alias,proto3" json:"alias,omitempty"`
	Description          string       `protobuf:"bytes,9,opt,name=description,proto3" json:"description,omitempty"`
	Price                float32      `protobuf:"fixed32,10,opt,name=price,proto3" json:"price,omitempty"`
	OldPrice             float32      `protobuf:"fixed32,11,opt,name=old_price,json=oldPrice,proto3" json:"old_price,omitempty"`
	Count                int32        `protobuf:"varint,13,opt,name=count,proto3" json:"count,omitempty"`
	InStock              bool         `protobuf:"varint,14,opt,name=in_stock,json=inStock,proto3" json:"in_stock,omitempty"`
	Disable              bool         `protobuf:"varint,15,opt,name=disable,proto3" json:"disable,omitempty"`
	Sort                 uint32       `protobuf:"varint,16,opt,name=sort,proto3" json:"sort,omitempty"`
	SeoTitle             string       `protobuf:"bytes,17,opt,name=seo_title,json=seoTitle,proto3" json:"seo_title,omitempty"`
	SeoDescription       string       `protobuf:"bytes,18,opt,name=seo_description,json=seoDescription,proto3" json:"seo_description,omitempty"`
	SeoKeywords          string       `protobuf:"bytes,19,opt,name=seo_keywords,json=seoKeywords,proto3" json:"seo_keywords,omitempty"`
	Properties           []*Property  `protobuf:"bytes,20,rep,name=properties,proto3" json:"properties,omitempty"`
	Images               []*ItemImage `protobuf:"bytes,23,rep,name=images,proto3" json:"images,omitempty"`
	Offers               []*Item      `protobuf:"bytes,24,rep,name=offers,proto3" json:"offers,omitempty"`
	Vendor               *Vendor      `protobuf:"bytes,21,opt,name=vendor,proto3" json:"vendor,omitempty"`
	Currency             *Currency    `protobuf:"bytes,22,opt,name=currency,proto3" json:"currency,omitempty"`
	XXX_NoUnkeyedLiteral struct{}     `json:"-"`
	XXX_unrecognized     []byte       `json:"-"`
	XXX_sizecache        int32        `json:"-"`
}

func (m *Item) Reset()         { *m = Item{} }
func (m *Item) String() string { return proto.CompactTextString(m) }
func (*Item) ProtoMessage()    {}
func (*Item) Descriptor() ([]byte, []int) {
	return fileDescriptor_6007f868cf6553df, []int{0}
}

func (m *Item) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Item.Unmarshal(m, b)
}
func (m *Item) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Item.Marshal(b, m, deterministic)
}
func (m *Item) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Item.Merge(m, src)
}
func (m *Item) XXX_Size() int {
	return xxx_messageInfo_Item.Size(m)
}
func (m *Item) XXX_DiscardUnknown() {
	xxx_messageInfo_Item.DiscardUnknown(m)
}

var xxx_messageInfo_Item proto.InternalMessageInfo

func (m *Item) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

func (m *Item) GetUserId() uint32 {
	if m != nil {
		return m.UserId
	}
	return 0
}

func (m *Item) GetParentId() uint64 {
	if m != nil {
		return m.ParentId
	}
	return 0
}

func (m *Item) GetCategoryId() uint32 {
	if m != nil {
		return m.CategoryId
	}
	return 0
}

func (m *Item) GetTitle() string {
	if m != nil {
		return m.Title
	}
	return ""
}

func (m *Item) GetArticle() string {
	if m != nil {
		return m.Article
	}
	return ""
}

func (m *Item) GetAlias() string {
	if m != nil {
		return m.Alias
	}
	return ""
}

func (m *Item) GetDescription() string {
	if m != nil {
		return m.Description
	}
	return ""
}

func (m *Item) GetPrice() float32 {
	if m != nil {
		return m.Price
	}
	return 0
}

func (m *Item) GetOldPrice() float32 {
	if m != nil {
		return m.OldPrice
	}
	return 0
}

func (m *Item) GetCount() int32 {
	if m != nil {
		return m.Count
	}
	return 0
}

func (m *Item) GetInStock() bool {
	if m != nil {
		return m.InStock
	}
	return false
}

func (m *Item) GetDisable() bool {
	if m != nil {
		return m.Disable
	}
	return false
}

func (m *Item) GetSort() uint32 {
	if m != nil {
		return m.Sort
	}
	return 0
}

func (m *Item) GetSeoTitle() string {
	if m != nil {
		return m.SeoTitle
	}
	return ""
}

func (m *Item) GetSeoDescription() string {
	if m != nil {
		return m.SeoDescription
	}
	return ""
}

func (m *Item) GetSeoKeywords() string {
	if m != nil {
		return m.SeoKeywords
	}
	return ""
}

func (m *Item) GetProperties() []*Property {
	if m != nil {
		return m.Properties
	}
	return nil
}

func (m *Item) GetImages() []*ItemImage {
	if m != nil {
		return m.Images
	}
	return nil
}

func (m *Item) GetOffers() []*Item {
	if m != nil {
		return m.Offers
	}
	return nil
}

func (m *Item) GetVendor() *Vendor {
	if m != nil {
		return m.Vendor
	}
	return nil
}

func (m *Item) GetCurrency() *Currency {
	if m != nil {
		return m.Currency
	}
	return nil
}

type ItemImage struct {
	Path                 string   `protobuf:"bytes,1,opt,name=path,proto3" json:"path,omitempty"`
	Filename             string   `protobuf:"bytes,2,opt,name=filename,proto3" json:"filename,omitempty"`
	Name                 string   `protobuf:"bytes,3,opt,name=name,proto3" json:"name,omitempty"`
	PropertyValueId      uint32   `protobuf:"varint,4,opt,name=property_value_id,json=propertyValueId,proto3" json:"property_value_id,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *ItemImage) Reset()         { *m = ItemImage{} }
func (m *ItemImage) String() string { return proto.CompactTextString(m) }
func (*ItemImage) ProtoMessage()    {}
func (*ItemImage) Descriptor() ([]byte, []int) {
	return fileDescriptor_6007f868cf6553df, []int{1}
}

func (m *ItemImage) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ItemImage.Unmarshal(m, b)
}
func (m *ItemImage) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ItemImage.Marshal(b, m, deterministic)
}
func (m *ItemImage) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ItemImage.Merge(m, src)
}
func (m *ItemImage) XXX_Size() int {
	return xxx_messageInfo_ItemImage.Size(m)
}
func (m *ItemImage) XXX_DiscardUnknown() {
	xxx_messageInfo_ItemImage.DiscardUnknown(m)
}

var xxx_messageInfo_ItemImage proto.InternalMessageInfo

func (m *ItemImage) GetPath() string {
	if m != nil {
		return m.Path
	}
	return ""
}

func (m *ItemImage) GetFilename() string {
	if m != nil {
		return m.Filename
	}
	return ""
}

func (m *ItemImage) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *ItemImage) GetPropertyValueId() uint32 {
	if m != nil {
		return m.PropertyValueId
	}
	return 0
}

type ItemRequest struct {
	Id                   uint32   `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *ItemRequest) Reset()         { *m = ItemRequest{} }
func (m *ItemRequest) String() string { return proto.CompactTextString(m) }
func (*ItemRequest) ProtoMessage()    {}
func (*ItemRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_6007f868cf6553df, []int{2}
}

func (m *ItemRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ItemRequest.Unmarshal(m, b)
}
func (m *ItemRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ItemRequest.Marshal(b, m, deterministic)
}
func (m *ItemRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ItemRequest.Merge(m, src)
}
func (m *ItemRequest) XXX_Size() int {
	return xxx_messageInfo_ItemRequest.Size(m)
}
func (m *ItemRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_ItemRequest.DiscardUnknown(m)
}

var xxx_messageInfo_ItemRequest proto.InternalMessageInfo

func (m *ItemRequest) GetId() uint32 {
	if m != nil {
		return m.Id
	}
	return 0
}

type ItemsRequest struct {
	Page                 uint32   `protobuf:"varint,1,opt,name=page,proto3" json:"page,omitempty"`
	PageSize             uint32   `protobuf:"varint,2,opt,name=page_size,json=pageSize,proto3" json:"page_size,omitempty"`
	Sort                 string   `protobuf:"bytes,3,opt,name=sort,proto3" json:"sort,omitempty"`
	Direction            string   `protobuf:"bytes,4,opt,name=direction,proto3" json:"direction,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *ItemsRequest) Reset()         { *m = ItemsRequest{} }
func (m *ItemsRequest) String() string { return proto.CompactTextString(m) }
func (*ItemsRequest) ProtoMessage()    {}
func (*ItemsRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_6007f868cf6553df, []int{3}
}

func (m *ItemsRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ItemsRequest.Unmarshal(m, b)
}
func (m *ItemsRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ItemsRequest.Marshal(b, m, deterministic)
}
func (m *ItemsRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ItemsRequest.Merge(m, src)
}
func (m *ItemsRequest) XXX_Size() int {
	return xxx_messageInfo_ItemsRequest.Size(m)
}
func (m *ItemsRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_ItemsRequest.DiscardUnknown(m)
}

var xxx_messageInfo_ItemsRequest proto.InternalMessageInfo

func (m *ItemsRequest) GetPage() uint32 {
	if m != nil {
		return m.Page
	}
	return 0
}

func (m *ItemsRequest) GetPageSize() uint32 {
	if m != nil {
		return m.PageSize
	}
	return 0
}

func (m *ItemsRequest) GetSort() string {
	if m != nil {
		return m.Sort
	}
	return ""
}

func (m *ItemsRequest) GetDirection() string {
	if m != nil {
		return m.Direction
	}
	return ""
}

type ItemResponse struct {
	Item                 *Item    `protobuf:"bytes,1,opt,name=item,proto3" json:"item,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *ItemResponse) Reset()         { *m = ItemResponse{} }
func (m *ItemResponse) String() string { return proto.CompactTextString(m) }
func (*ItemResponse) ProtoMessage()    {}
func (*ItemResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_6007f868cf6553df, []int{4}
}

func (m *ItemResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ItemResponse.Unmarshal(m, b)
}
func (m *ItemResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ItemResponse.Marshal(b, m, deterministic)
}
func (m *ItemResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ItemResponse.Merge(m, src)
}
func (m *ItemResponse) XXX_Size() int {
	return xxx_messageInfo_ItemResponse.Size(m)
}
func (m *ItemResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_ItemResponse.DiscardUnknown(m)
}

var xxx_messageInfo_ItemResponse proto.InternalMessageInfo

func (m *ItemResponse) GetItem() *Item {
	if m != nil {
		return m.Item
	}
	return nil
}

type ItemsResponse struct {
	Items                []*Item  `protobuf:"bytes,1,rep,name=items,proto3" json:"items,omitempty"`
	Total                uint32   `protobuf:"varint,2,opt,name=total,proto3" json:"total,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *ItemsResponse) Reset()         { *m = ItemsResponse{} }
func (m *ItemsResponse) String() string { return proto.CompactTextString(m) }
func (*ItemsResponse) ProtoMessage()    {}
func (*ItemsResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_6007f868cf6553df, []int{5}
}

func (m *ItemsResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ItemsResponse.Unmarshal(m, b)
}
func (m *ItemsResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ItemsResponse.Marshal(b, m, deterministic)
}
func (m *ItemsResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ItemsResponse.Merge(m, src)
}
func (m *ItemsResponse) XXX_Size() int {
	return xxx_messageInfo_ItemsResponse.Size(m)
}
func (m *ItemsResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_ItemsResponse.DiscardUnknown(m)
}

var xxx_messageInfo_ItemsResponse proto.InternalMessageInfo

func (m *ItemsResponse) GetItems() []*Item {
	if m != nil {
		return m.Items
	}
	return nil
}

func (m *ItemsResponse) GetTotal() uint32 {
	if m != nil {
		return m.Total
	}
	return 0
}

func init() {
	proto.RegisterType((*Item)(nil), "v1.Item")
	proto.RegisterType((*ItemImage)(nil), "v1.ItemImage")
	proto.RegisterType((*ItemRequest)(nil), "v1.ItemRequest")
	proto.RegisterType((*ItemsRequest)(nil), "v1.ItemsRequest")
	proto.RegisterType((*ItemResponse)(nil), "v1.ItemResponse")
	proto.RegisterType((*ItemsResponse)(nil), "v1.ItemsResponse")
}

func init() {
	proto.RegisterFile("item.proto", fileDescriptor_6007f868cf6553df)
}

var fileDescriptor_6007f868cf6553df = []byte{
	// 660 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x5c, 0x54, 0xcb, 0x6e, 0xdb, 0x3a,
	0x10, 0x85, 0x1c, 0x3f, 0xe4, 0xf1, 0x2b, 0xe1, 0xcd, 0xbd, 0xe1, 0x75, 0xd2, 0x56, 0x35, 0x50,
	0x54, 0x2d, 0x82, 0x04, 0x49, 0x3f, 0xa1, 0xed, 0xc2, 0xe8, 0x26, 0x50, 0x8a, 0x6c, 0x0d, 0x45,
	0x1a, 0xbb, 0x44, 0x64, 0x51, 0x21, 0x69, 0x17, 0x49, 0xbf, 0xa3, 0xff, 0x5b, 0x70, 0x48, 0x29,
	0x42, 0x77, 0x3c, 0x0f, 0x82, 0x67, 0xc8, 0x19, 0x02, 0x08, 0x83, 0xdb, 0x8b, 0x4a, 0x49, 0x23,
	0x59, 0x67, 0x7f, 0x35, 0x3f, 0xdd, 0x48, 0xb9, 0x29, 0xf0, 0x92, 0x98, 0xfb, 0xdd, 0xfa, 0x12,
	0xb7, 0x95, 0x79, 0x72, 0x86, 0xf9, 0x34, 0x4b, 0x0d, 0x6e, 0xa4, 0x6a, 0x70, 0xa5, 0x64, 0x85,
	0xaa, 0xd1, 0xc7, 0x7b, 0x2c, 0x73, 0xa9, 0x1a, 0xf7, 0x4e, 0x29, 0x2c, 0x33, 0xaf, 0x2e, 0x7e,
	0xf7, 0xa0, 0xbb, 0x34, 0xb8, 0x65, 0x53, 0xe8, 0x88, 0x9c, 0x07, 0x51, 0x10, 0x0f, 0x93, 0x8e,
	0xc8, 0xd9, 0x09, 0x0c, 0x76, 0x1a, 0xd5, 0x4a, 0xe4, 0xbc, 0x13, 0x05, 0xf1, 0x24, 0xe9, 0x5b,
	0xb8, 0xcc, 0xd9, 0x29, 0x0c, 0xab, 0x54, 0x61, 0x69, 0xac, 0xd4, 0x8d, 0x82, 0xb8, 0x9b, 0x84,
	0x8e, 0x58, 0xe6, 0xec, 0x0d, 0x8c, 0xea, 0x38, 0x56, 0xee, 0xd1, 0x4e, 0xa8, 0xa9, 0x65, 0xce,
	0x8e, 0xa1, 0x67, 0x84, 0x29, 0x90, 0xf7, 0xe9, 0x24, 0x07, 0x18, 0x87, 0x41, 0xaa, 0x8c, 0xc8,
	0x0a, 0xe4, 0x03, 0xe2, 0x6b, 0x68, 0xfd, 0x69, 0x21, 0x52, 0xcd, 0x43, 0xe7, 0x27, 0xc0, 0x22,
	0x18, 0xe5, 0xa8, 0x33, 0x25, 0x2a, 0x23, 0x64, 0xc9, 0x87, 0xa4, 0xb5, 0x29, 0xbb, 0xaf, 0x52,
	0x22, 0x43, 0x0e, 0x51, 0x10, 0x77, 0x12, 0x07, 0x6c, 0x76, 0x59, 0xe4, 0x2b, 0xa7, 0x8c, 0x48,
	0x09, 0x65, 0x91, 0xdf, 0x90, 0x78, 0x0c, 0xbd, 0x4c, 0xee, 0x4a, 0xc3, 0x27, 0x51, 0x10, 0xf7,
	0x12, 0x07, 0xd8, 0xff, 0x10, 0x8a, 0x72, 0xa5, 0x8d, 0xcc, 0x1e, 0xf8, 0x34, 0x0a, 0xe2, 0x30,
	0x19, 0x88, 0xf2, 0xd6, 0x42, 0x9b, 0x3a, 0x17, 0x3a, 0xbd, 0x2f, 0x90, 0xcf, 0x9c, 0xe2, 0x21,
	0x63, 0xd0, 0xd5, 0x52, 0x19, 0x7e, 0x48, 0xf5, 0xd3, 0xda, 0x9e, 0xad, 0x51, 0xae, 0x5c, 0xf5,
	0x47, 0x94, 0x38, 0xd4, 0x28, 0xbf, 0xd3, 0x05, 0xbc, 0x87, 0x99, 0x15, 0xdb, 0x45, 0x31, 0xb2,
	0x4c, 0x35, 0xca, 0x2f, 0xad, 0xba, 0xde, 0xc2, 0xd8, 0x1a, 0x1f, 0xf0, 0xe9, 0xa7, 0x54, 0xb9,
	0xe6, 0xff, 0xb8, 0xd2, 0x35, 0xca, 0x6f, 0x9e, 0x62, 0xe7, 0x00, 0xbe, 0x05, 0x04, 0x6a, 0x7e,
	0x1c, 0x1d, 0xc4, 0xa3, 0xeb, 0xf1, 0xc5, 0xfe, 0xea, 0xe2, 0xc6, 0x37, 0x46, 0xd2, 0xd2, 0xd9,
	0x3b, 0xe8, 0x8b, 0x6d, 0xba, 0x41, 0xcd, 0x4f, 0xc8, 0x39, 0xb1, 0x4e, 0xdb, 0x11, 0x4b, 0xcb,
	0x26, 0x5e, 0x64, 0x11, 0xf4, 0xe5, 0x7a, 0x8d, 0x4a, 0x73, 0x4e, 0xb6, 0xb0, 0xb6, 0x25, 0x9e,
	0x67, 0x0b, 0xe8, 0xbb, 0x4e, 0xe3, 0xff, 0x46, 0x41, 0x3c, 0xba, 0x06, 0xeb, 0xb8, 0x23, 0x26,
	0xf1, 0x0a, 0x8b, 0x21, 0xac, 0xfb, 0x8f, 0xff, 0x47, 0x2e, 0x0a, 0xf6, 0xd9, 0x73, 0x49, 0xa3,
	0x2e, 0x7e, 0xc1, 0xb0, 0x09, 0x61, 0xaf, 0xb3, 0x4a, 0xcd, 0x0f, 0xdf, 0x9d, 0xb4, 0x66, 0x73,
	0x08, 0xd7, 0xa2, 0xc0, 0x32, 0xdd, 0x22, 0x35, 0xe8, 0x30, 0x69, 0xb0, 0xf5, 0x13, 0x7f, 0xe0,
	0xfc, 0xc4, 0x7d, 0x84, 0xa3, 0x7a, 0x30, 0x56, 0xfb, 0xb4, 0xd8, 0x61, 0xdd, 0xbe, 0x93, 0x64,
	0x56, 0x0b, 0x77, 0x96, 0x5f, 0xe6, 0x8b, 0x57, 0x30, 0xa2, 0xd2, 0xf0, 0x71, 0x87, 0xda, 0xb4,
	0x46, 0x63, 0x62, 0x47, 0x63, 0xf1, 0x08, 0x63, 0x2b, 0xeb, 0x5a, 0xa7, 0x78, 0x1b, 0xf4, 0x0e,
	0x5a, 0xbb, 0x29, 0xd9, 0xe0, 0x4a, 0x8b, 0x67, 0xf4, 0x03, 0x14, 0x5a, 0xe2, 0x56, 0x3c, 0xbf,
	0xb4, 0x87, 0xcf, 0x47, 0xed, 0x71, 0x06, 0xc3, 0x5c, 0x28, 0xcc, 0xe8, 0xed, 0xbb, 0x24, 0xbc,
	0x10, 0x8b, 0x73, 0x77, 0x64, 0x82, 0xba, 0x92, 0xa5, 0x46, 0x76, 0x06, 0x5d, 0xfb, 0x47, 0xd0,
	0x91, 0xed, 0xc7, 0x20, 0x76, 0xf1, 0x15, 0x26, 0x3e, 0xa0, 0xb7, 0xbf, 0x86, 0x9e, 0x15, 0x34,
	0x0f, 0xfe, 0x7a, 0x3c, 0x47, 0xd3, 0x54, 0x4a, 0x93, 0x16, 0x3e, 0xa9, 0x03, 0xd7, 0x6b, 0x77,
	0x0d, 0xb7, 0xa8, 0xf6, 0x76, 0x3e, 0x3e, 0xf8, 0x9f, 0x62, 0xd6, 0xec, 0x76, 0xf5, 0xcf, 0x0f,
	0x5f, 0x08, 0x7f, 0xde, 0x39, 0xf4, 0x28, 0x00, 0x6b, 0xa4, 0xfa, 0xb2, 0xe6, 0x47, 0x2d, 0xc6,
	0xb9, 0xef, 0xfb, 0xf4, 0x15, 0x7d, 0xfa, 0x13, 0x00, 0x00, 0xff, 0xff, 0x4e, 0xe8, 0x13, 0xf9,
	0xf7, 0x04, 0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConnInterface

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion6

// ItemServiceClient is the client API for ItemService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type ItemServiceClient interface {
	Item(ctx context.Context, in *ItemRequest, opts ...grpc.CallOption) (*ItemResponse, error)
	Items(ctx context.Context, in *ItemsRequest, opts ...grpc.CallOption) (*ItemsResponse, error)
}

type itemServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewItemServiceClient(cc grpc.ClientConnInterface) ItemServiceClient {
	return &itemServiceClient{cc}
}

func (c *itemServiceClient) Item(ctx context.Context, in *ItemRequest, opts ...grpc.CallOption) (*ItemResponse, error) {
	out := new(ItemResponse)
	err := c.cc.Invoke(ctx, "/v1.ItemService/Item", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *itemServiceClient) Items(ctx context.Context, in *ItemsRequest, opts ...grpc.CallOption) (*ItemsResponse, error) {
	out := new(ItemsResponse)
	err := c.cc.Invoke(ctx, "/v1.ItemService/Items", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ItemServiceServer is the server API for ItemService service.
type ItemServiceServer interface {
	Item(context.Context, *ItemRequest) (*ItemResponse, error)
	Items(context.Context, *ItemsRequest) (*ItemsResponse, error)
}

// UnimplementedItemServiceServer can be embedded to have forward compatible implementations.
type UnimplementedItemServiceServer struct {
}

func (*UnimplementedItemServiceServer) Item(ctx context.Context, req *ItemRequest) (*ItemResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Item not implemented")
}
func (*UnimplementedItemServiceServer) Items(ctx context.Context, req *ItemsRequest) (*ItemsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Items not implemented")
}

func RegisterItemServiceServer(s *grpc.Server, srv ItemServiceServer) {
	s.RegisterService(&_ItemService_serviceDesc, srv)
}

func _ItemService_Item_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ItemRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ItemServiceServer).Item(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/v1.ItemService/Item",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ItemServiceServer).Item(ctx, req.(*ItemRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _ItemService_Items_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ItemsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ItemServiceServer).Items(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/v1.ItemService/Items",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ItemServiceServer).Items(ctx, req.(*ItemsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _ItemService_serviceDesc = grpc.ServiceDesc{
	ServiceName: "v1.ItemService",
	HandlerType: (*ItemServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Item",
			Handler:    _ItemService_Item_Handler,
		},
		{
			MethodName: "Items",
			Handler:    _ItemService_Items_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "item.proto",
}
