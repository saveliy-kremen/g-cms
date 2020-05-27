import * as jspb from "google-protobuf"

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as admin$category_pb from './admin-category_pb';
import * as admin$property_pb from './admin-property_pb';
import * as vendor_pb from './vendor_pb';
import * as currency_pb from './currency_pb';

export class AdminItem extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getUserId(): number;
  setUserId(value: number): void;

  getParentId(): number;
  setParentId(value: number): void;

  getCategoryId(): number;
  setCategoryId(value: number): void;

  getTitle(): string;
  setTitle(value: string): void;

  getArticle(): string;
  setArticle(value: string): void;

  getAlias(): string;
  setAlias(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getPrice(): number;
  setPrice(value: number): void;

  getOldPrice(): number;
  setOldPrice(value: number): void;

  getCount(): number;
  setCount(value: number): void;

  getInStock(): boolean;
  setInStock(value: boolean): void;

  getDisable(): boolean;
  setDisable(value: boolean): void;

  getSort(): number;
  setSort(value: number): void;

  getSeoTitle(): string;
  setSeoTitle(value: string): void;

  getSeoDescription(): string;
  setSeoDescription(value: string): void;

  getSeoKeywords(): string;
  setSeoKeywords(value: string): void;

  getVendor(): vendor_pb.Vendor | undefined;
  setVendor(value?: vendor_pb.Vendor): void;
  hasVendor(): boolean;
  clearVendor(): void;

  getCurrency(): currency_pb.Currency | undefined;
  setCurrency(value?: currency_pb.Currency): void;
  hasCurrency(): boolean;
  clearCurrency(): void;

  getImagesList(): Array<AdminItemImage>;
  setImagesList(value: Array<AdminItemImage>): void;
  clearImagesList(): void;
  addImages(value?: AdminItemImage, index?: number): AdminItemImage;

  getOffersList(): Array<AdminItem>;
  setOffersList(value: Array<AdminItem>): void;
  clearOffersList(): void;
  addOffers(value?: AdminItem, index?: number): AdminItem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminItem.AsObject;
  static toObject(includeInstance: boolean, msg: AdminItem): AdminItem.AsObject;
  static serializeBinaryToWriter(message: AdminItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminItem;
  static deserializeBinaryFromReader(message: AdminItem, reader: jspb.BinaryReader): AdminItem;
}

export namespace AdminItem {
  export type AsObject = {
    id: string,
    userId: number,
    parentId: number,
    categoryId: number,
    title: string,
    article: string,
    alias: string,
    description: string,
    price: number,
    oldPrice: number,
    count: number,
    inStock: boolean,
    disable: boolean,
    sort: number,
    seoTitle: string,
    seoDescription: string,
    seoKeywords: string,
    vendor?: vendor_pb.Vendor.AsObject,
    currency?: currency_pb.Currency.AsObject,
    imagesList: Array<AdminItemImage.AsObject>,
    offersList: Array<AdminItem.AsObject>,
  }
}

export class AdminItemImage extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getUserId(): number;
  setUserId(value: number): void;

  getItemId(): number;
  setItemId(value: number): void;

  getFilename(): string;
  setFilename(value: string): void;

  getSort(): number;
  setSort(value: number): void;

  getPropertyValueId(): number;
  setPropertyValueId(value: number): void;

  getMain(): boolean;
  setMain(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminItemImage.AsObject;
  static toObject(includeInstance: boolean, msg: AdminItemImage): AdminItemImage.AsObject;
  static serializeBinaryToWriter(message: AdminItemImage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminItemImage;
  static deserializeBinaryFromReader(message: AdminItemImage, reader: jspb.BinaryReader): AdminItemImage;
}

export namespace AdminItemImage {
  export type AsObject = {
    id: number,
    userId: number,
    itemId: number,
    filename: string,
    sort: number,
    propertyValueId: number,
    main: boolean,
  }
}

export class AdminItemProperty extends jspb.Message {
  getCode(): string;
  setCode(value: string): void;

  getPropertyValueIdsList(): Array<number>;
  setPropertyValueIdsList(value: Array<number>): void;
  clearPropertyValueIdsList(): void;
  addPropertyValueIds(value: number, index?: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminItemProperty.AsObject;
  static toObject(includeInstance: boolean, msg: AdminItemProperty): AdminItemProperty.AsObject;
  static serializeBinaryToWriter(message: AdminItemProperty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminItemProperty;
  static deserializeBinaryFromReader(message: AdminItemProperty, reader: jspb.BinaryReader): AdminItemProperty;
}

export namespace AdminItemProperty {
  export type AsObject = {
    code: string,
    propertyValueIdsList: Array<number>,
  }
}

export class AdminItemRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminItemRequest): AdminItemRequest.AsObject;
  static serializeBinaryToWriter(message: AdminItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminItemRequest;
  static deserializeBinaryFromReader(message: AdminItemRequest, reader: jspb.BinaryReader): AdminItemRequest;
}

export namespace AdminItemRequest {
  export type AsObject = {
    id: number,
  }
}

export class AdminDraftRequest extends jspb.Message {
  getParentId(): number;
  setParentId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminDraftRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminDraftRequest): AdminDraftRequest.AsObject;
  static serializeBinaryToWriter(message: AdminDraftRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminDraftRequest;
  static deserializeBinaryFromReader(message: AdminDraftRequest, reader: jspb.BinaryReader): AdminDraftRequest;
}

export namespace AdminDraftRequest {
  export type AsObject = {
    parentId: number,
  }
}

export class AdminItemsRequest extends jspb.Message {
  getPage(): number;
  setPage(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getSort(): string;
  setSort(value: string): void;

  getDirection(): string;
  setDirection(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminItemsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminItemsRequest): AdminItemsRequest.AsObject;
  static serializeBinaryToWriter(message: AdminItemsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminItemsRequest;
  static deserializeBinaryFromReader(message: AdminItemsRequest, reader: jspb.BinaryReader): AdminItemsRequest;
}

export namespace AdminItemsRequest {
  export type AsObject = {
    page: number,
    pageSize: number,
    sort: string,
    direction: string,
  }
}

export class AdminOffersRequest extends jspb.Message {
  getItemId(): number;
  setItemId(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getSort(): string;
  setSort(value: string): void;

  getDirection(): string;
  setDirection(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminOffersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminOffersRequest): AdminOffersRequest.AsObject;
  static serializeBinaryToWriter(message: AdminOffersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminOffersRequest;
  static deserializeBinaryFromReader(message: AdminOffersRequest, reader: jspb.BinaryReader): AdminOffersRequest;
}

export namespace AdminOffersRequest {
  export type AsObject = {
    itemId: number,
    page: number,
    pageSize: number,
    sort: string,
    direction: string,
  }
}

export class AdminEditItemRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getParentId(): number;
  setParentId(value: number): void;

  getTitle(): string;
  setTitle(value: string): void;

  getArticle(): string;
  setArticle(value: string): void;

  getAlias(): string;
  setAlias(value: string): void;

  getCount(): number;
  setCount(value: number): void;

  getInstock(): boolean;
  setInstock(value: boolean): void;

  getDescription(): string;
  setDescription(value: string): void;

  getPrice(): number;
  setPrice(value: number): void;

  getOldPrice(): number;
  setOldPrice(value: number): void;

  getCurrencyId(): number;
  setCurrencyId(value: number): void;

  getDisable(): boolean;
  setDisable(value: boolean): void;

  getSort(): number;
  setSort(value: number): void;

  getVendorId(): number;
  setVendorId(value: number): void;

  getItemImagesList(): Array<number>;
  setItemImagesList(value: Array<number>): void;
  clearItemImagesList(): void;
  addItemImages(value: number, index?: number): void;

  getUploadImagesList(): Array<number>;
  setUploadImagesList(value: Array<number>): void;
  clearUploadImagesList(): void;
  addUploadImages(value: number, index?: number): void;

  getPropertiesList(): Array<AdminItemProperty>;
  setPropertiesList(value: Array<AdminItemProperty>): void;
  clearPropertiesList(): void;
  addProperties(value?: AdminItemProperty, index?: number): AdminItemProperty;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminEditItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminEditItemRequest): AdminEditItemRequest.AsObject;
  static serializeBinaryToWriter(message: AdminEditItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminEditItemRequest;
  static deserializeBinaryFromReader(message: AdminEditItemRequest, reader: jspb.BinaryReader): AdminEditItemRequest;
}

export namespace AdminEditItemRequest {
  export type AsObject = {
    id: number,
    parentId: number,
    title: string,
    article: string,
    alias: string,
    count: number,
    instock: boolean,
    description: string,
    price: number,
    oldPrice: number,
    currencyId: number,
    disable: boolean,
    sort: number,
    vendorId: number,
    itemImagesList: Array<number>,
    uploadImagesList: Array<number>,
    propertiesList: Array<AdminItemProperty.AsObject>,
  }
}

export class AdminDeleteItemRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getSort(): string;
  setSort(value: string): void;

  getDirection(): string;
  setDirection(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminDeleteItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminDeleteItemRequest): AdminDeleteItemRequest.AsObject;
  static serializeBinaryToWriter(message: AdminDeleteItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminDeleteItemRequest;
  static deserializeBinaryFromReader(message: AdminDeleteItemRequest, reader: jspb.BinaryReader): AdminDeleteItemRequest;
}

export namespace AdminDeleteItemRequest {
  export type AsObject = {
    id: number,
    page: number,
    pageSize: number,
    sort: string,
    direction: string,
  }
}

export class AdminDeleteOfferRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getParentId(): number;
  setParentId(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getSort(): string;
  setSort(value: string): void;

  getDirection(): string;
  setDirection(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminDeleteOfferRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminDeleteOfferRequest): AdminDeleteOfferRequest.AsObject;
  static serializeBinaryToWriter(message: AdminDeleteOfferRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminDeleteOfferRequest;
  static deserializeBinaryFromReader(message: AdminDeleteOfferRequest, reader: jspb.BinaryReader): AdminDeleteOfferRequest;
}

export namespace AdminDeleteOfferRequest {
  export type AsObject = {
    id: number,
    parentId: number,
    page: number,
    pageSize: number,
    sort: string,
    direction: string,
  }
}

export class AdminItemBindRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getCategoryId(): string;
  setCategoryId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminItemBindRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminItemBindRequest): AdminItemBindRequest.AsObject;
  static serializeBinaryToWriter(message: AdminItemBindRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminItemBindRequest;
  static deserializeBinaryFromReader(message: AdminItemBindRequest, reader: jspb.BinaryReader): AdminItemBindRequest;
}

export namespace AdminItemBindRequest {
  export type AsObject = {
    id: number,
    categoryId: string,
  }
}

export class AdminUploadOfferRequest extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): void;

  getArticle(): string;
  setArticle(value: string): void;

  getParentId(): number;
  setParentId(value: number): void;

  getCategoryId(): number;
  setCategoryId(value: number): void;

  getPrice(): number;
  setPrice(value: number): void;

  getCurrency(): string;
  setCurrency(value: string): void;

  getCount(): number;
  setCount(value: number): void;

  getInstock(): boolean;
  setInstock(value: boolean): void;

  getDescription(): string;
  setDescription(value: string): void;

  getVendor(): string;
  setVendor(value: string): void;

  getCountry(): string;
  setCountry(value: string): void;

  getImagesList(): Array<string>;
  setImagesList(value: Array<string>): void;
  clearImagesList(): void;
  addImages(value: string, index?: number): void;

  getPropertiesList(): Array<number>;
  setPropertiesList(value: Array<number>): void;
  clearPropertiesList(): void;
  addProperties(value: number, index?: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminUploadOfferRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminUploadOfferRequest): AdminUploadOfferRequest.AsObject;
  static serializeBinaryToWriter(message: AdminUploadOfferRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminUploadOfferRequest;
  static deserializeBinaryFromReader(message: AdminUploadOfferRequest, reader: jspb.BinaryReader): AdminUploadOfferRequest;
}

export namespace AdminUploadOfferRequest {
  export type AsObject = {
    title: string,
    article: string,
    parentId: number,
    categoryId: number,
    price: number,
    currency: string,
    count: number,
    instock: boolean,
    description: string,
    vendor: string,
    country: string,
    imagesList: Array<string>,
    propertiesList: Array<number>,
  }
}

export class AdminItemResponse extends jspb.Message {
  getItem(): AdminItem | undefined;
  setItem(value?: AdminItem): void;
  hasItem(): boolean;
  clearItem(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminItemResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AdminItemResponse): AdminItemResponse.AsObject;
  static serializeBinaryToWriter(message: AdminItemResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminItemResponse;
  static deserializeBinaryFromReader(message: AdminItemResponse, reader: jspb.BinaryReader): AdminItemResponse;
}

export namespace AdminItemResponse {
  export type AsObject = {
    item?: AdminItem.AsObject,
  }
}

export class AdminItemsResponse extends jspb.Message {
  getItemsList(): Array<AdminItem>;
  setItemsList(value: Array<AdminItem>): void;
  clearItemsList(): void;
  addItems(value?: AdminItem, index?: number): AdminItem;

  getTotal(): number;
  setTotal(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminItemsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AdminItemsResponse): AdminItemsResponse.AsObject;
  static serializeBinaryToWriter(message: AdminItemsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminItemsResponse;
  static deserializeBinaryFromReader(message: AdminItemsResponse, reader: jspb.BinaryReader): AdminItemsResponse;
}

export namespace AdminItemsResponse {
  export type AsObject = {
    itemsList: Array<AdminItem.AsObject>,
    total: number,
  }
}

export class AdminOffersResponse extends jspb.Message {
  getOffersList(): Array<AdminItem>;
  setOffersList(value: Array<AdminItem>): void;
  clearOffersList(): void;
  addOffers(value?: AdminItem, index?: number): AdminItem;

  getTotal(): number;
  setTotal(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminOffersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AdminOffersResponse): AdminOffersResponse.AsObject;
  static serializeBinaryToWriter(message: AdminOffersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminOffersResponse;
  static deserializeBinaryFromReader(message: AdminOffersResponse, reader: jspb.BinaryReader): AdminOffersResponse;
}

export namespace AdminOffersResponse {
  export type AsObject = {
    offersList: Array<AdminItem.AsObject>,
    total: number,
  }
}

export class AdminItemImagesResponse extends jspb.Message {
  getImagesList(): Array<AdminItemImage>;
  setImagesList(value: Array<AdminItemImage>): void;
  clearImagesList(): void;
  addImages(value?: AdminItemImage, index?: number): AdminItemImage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminItemImagesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AdminItemImagesResponse): AdminItemImagesResponse.AsObject;
  static serializeBinaryToWriter(message: AdminItemImagesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminItemImagesResponse;
  static deserializeBinaryFromReader(message: AdminItemImagesResponse, reader: jspb.BinaryReader): AdminItemImagesResponse;
}

export namespace AdminItemImagesResponse {
  export type AsObject = {
    imagesList: Array<AdminItemImage.AsObject>,
  }
}

