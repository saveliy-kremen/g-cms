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

  getRozetkaCategory(): AdminItemRozetkaCategory | undefined;
  setRozetkaCategory(value?: AdminItemRozetkaCategory): void;
  hasRozetkaCategory(): boolean;
  clearRozetkaCategory(): void;

  getRozetkaPropertiesList(): Array<AdminItemRozetkaProperty>;
  setRozetkaPropertiesList(value: Array<AdminItemRozetkaProperty>): void;
  clearRozetkaPropertiesList(): void;
  addRozetkaProperties(value?: AdminItemRozetkaProperty, index?: number): AdminItemRozetkaProperty;

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
    rozetkaCategory?: AdminItemRozetkaCategory.AsObject,
    rozetkaPropertiesList: Array<AdminItemRozetkaProperty.AsObject>,
  }
}

export class AdminItemImage extends jspb.Message {
  getPath(): string;
  setPath(value: string): void;

  getFilename(): string;
  setFilename(value: string): void;

  getName(): string;
  setName(value: string): void;

  getPropertyValueId(): number;
  setPropertyValueId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminItemImage.AsObject;
  static toObject(includeInstance: boolean, msg: AdminItemImage): AdminItemImage.AsObject;
  static serializeBinaryToWriter(message: AdminItemImage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminItemImage;
  static deserializeBinaryFromReader(message: AdminItemImage, reader: jspb.BinaryReader): AdminItemImage;
}

export namespace AdminItemImage {
  export type AsObject = {
    path: string,
    filename: string,
    name: string,
    propertyValueId: number,
  }
}

export class AdminUploadImage extends jspb.Message {
  getPath(): string;
  setPath(value: string): void;

  getFilename(): string;
  setFilename(value: string): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminUploadImage.AsObject;
  static toObject(includeInstance: boolean, msg: AdminUploadImage): AdminUploadImage.AsObject;
  static serializeBinaryToWriter(message: AdminUploadImage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminUploadImage;
  static deserializeBinaryFromReader(message: AdminUploadImage, reader: jspb.BinaryReader): AdminUploadImage;
}

export namespace AdminUploadImage {
  export type AsObject = {
    path: string,
    filename: string,
    name: string,
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

export class AdminRozetkaItemProperty extends jspb.Message {
  getPropertyId(): number;
  setPropertyId(value: number): void;

  getPropertyName(): string;
  setPropertyName(value: string): void;

  getPropertyValueId(): number;
  setPropertyValueId(value: number): void;

  getPropertyValueName(): string;
  setPropertyValueName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminRozetkaItemProperty.AsObject;
  static toObject(includeInstance: boolean, msg: AdminRozetkaItemProperty): AdminRozetkaItemProperty.AsObject;
  static serializeBinaryToWriter(message: AdminRozetkaItemProperty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminRozetkaItemProperty;
  static deserializeBinaryFromReader(message: AdminRozetkaItemProperty, reader: jspb.BinaryReader): AdminRozetkaItemProperty;
}

export namespace AdminRozetkaItemProperty {
  export type AsObject = {
    propertyId: number,
    propertyName: string,
    propertyValueId: number,
    propertyValueName: string,
  }
}

export class AdminRozetkaCategory extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getTitle(): string;
  setTitle(value: string): void;

  getFullTitle(): string;
  setFullTitle(value: string): void;

  getParent(): string;
  setParent(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminRozetkaCategory.AsObject;
  static toObject(includeInstance: boolean, msg: AdminRozetkaCategory): AdminRozetkaCategory.AsObject;
  static serializeBinaryToWriter(message: AdminRozetkaCategory, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminRozetkaCategory;
  static deserializeBinaryFromReader(message: AdminRozetkaCategory, reader: jspb.BinaryReader): AdminRozetkaCategory;
}

export namespace AdminRozetkaCategory {
  export type AsObject = {
    id: number,
    title: string,
    fullTitle: string,
    parent: string,
  }
}

export class AdminRozetkaProperty extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  getIsGlobal(): boolean;
  setIsGlobal(value: boolean): void;

  getFilterType(): string;
  setFilterType(value: string): void;

  getAttrType(): string;
  setAttrType(value: string): void;

  getValuesList(): Array<AdminRozetkaPropertyValue>;
  setValuesList(value: Array<AdminRozetkaPropertyValue>): void;
  clearValuesList(): void;
  addValues(value?: AdminRozetkaPropertyValue, index?: number): AdminRozetkaPropertyValue;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminRozetkaProperty.AsObject;
  static toObject(includeInstance: boolean, msg: AdminRozetkaProperty): AdminRozetkaProperty.AsObject;
  static serializeBinaryToWriter(message: AdminRozetkaProperty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminRozetkaProperty;
  static deserializeBinaryFromReader(message: AdminRozetkaProperty, reader: jspb.BinaryReader): AdminRozetkaProperty;
}

export namespace AdminRozetkaProperty {
  export type AsObject = {
    id: number,
    name: string,
    isGlobal: boolean,
    filterType: string,
    attrType: string,
    valuesList: Array<AdminRozetkaPropertyValue.AsObject>,
  }
}

export class AdminRozetkaPropertyValue extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminRozetkaPropertyValue.AsObject;
  static toObject(includeInstance: boolean, msg: AdminRozetkaPropertyValue): AdminRozetkaPropertyValue.AsObject;
  static serializeBinaryToWriter(message: AdminRozetkaPropertyValue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminRozetkaPropertyValue;
  static deserializeBinaryFromReader(message: AdminRozetkaPropertyValue, reader: jspb.BinaryReader): AdminRozetkaPropertyValue;
}

export namespace AdminRozetkaPropertyValue {
  export type AsObject = {
    id: number,
    name: string,
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

export class AdminItemRozetkaCategory extends jspb.Message {
  getItemId(): number;
  setItemId(value: number): void;

  getId(): number;
  setId(value: number): void;

  getTitle(): string;
  setTitle(value: string): void;

  getFullTitle(): string;
  setFullTitle(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminItemRozetkaCategory.AsObject;
  static toObject(includeInstance: boolean, msg: AdminItemRozetkaCategory): AdminItemRozetkaCategory.AsObject;
  static serializeBinaryToWriter(message: AdminItemRozetkaCategory, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminItemRozetkaCategory;
  static deserializeBinaryFromReader(message: AdminItemRozetkaCategory, reader: jspb.BinaryReader): AdminItemRozetkaCategory;
}

export namespace AdminItemRozetkaCategory {
  export type AsObject = {
    itemId: number,
    id: number,
    title: string,
    fullTitle: string,
  }
}

export class AdminItemRozetkaProperty extends jspb.Message {
  getPropertyId(): number;
  setPropertyId(value: number): void;

  getPropertyName(): string;
  setPropertyName(value: string): void;

  getPropertyValueId(): number;
  setPropertyValueId(value: number): void;

  getPropertyValueName(): string;
  setPropertyValueName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminItemRozetkaProperty.AsObject;
  static toObject(includeInstance: boolean, msg: AdminItemRozetkaProperty): AdminItemRozetkaProperty.AsObject;
  static serializeBinaryToWriter(message: AdminItemRozetkaProperty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminItemRozetkaProperty;
  static deserializeBinaryFromReader(message: AdminItemRozetkaProperty, reader: jspb.BinaryReader): AdminItemRozetkaProperty;
}

export namespace AdminItemRozetkaProperty {
  export type AsObject = {
    propertyId: number,
    propertyName: string,
    propertyValueId: number,
    propertyValueName: string,
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

  getItemImages(): string;
  setItemImages(value: string): void;

  getUploadImages(): string;
  setUploadImages(value: string): void;

  getPropertiesList(): Array<AdminItemProperty>;
  setPropertiesList(value: Array<AdminItemProperty>): void;
  clearPropertiesList(): void;
  addProperties(value?: AdminItemProperty, index?: number): AdminItemProperty;

  getRozetkaPropertiesList(): Array<AdminRozetkaItemProperty>;
  setRozetkaPropertiesList(value: Array<AdminRozetkaItemProperty>): void;
  clearRozetkaPropertiesList(): void;
  addRozetkaProperties(value?: AdminRozetkaItemProperty, index?: number): AdminRozetkaItemProperty;

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
    itemImages: string,
    uploadImages: string,
    propertiesList: Array<AdminItemProperty.AsObject>,
    rozetkaPropertiesList: Array<AdminRozetkaItemProperty.AsObject>,
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

export class AdminRozetkaCategoriesRequest extends jspb.Message {
  getSearch(): string;
  setSearch(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminRozetkaCategoriesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminRozetkaCategoriesRequest): AdminRozetkaCategoriesRequest.AsObject;
  static serializeBinaryToWriter(message: AdminRozetkaCategoriesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminRozetkaCategoriesRequest;
  static deserializeBinaryFromReader(message: AdminRozetkaCategoriesRequest, reader: jspb.BinaryReader): AdminRozetkaCategoriesRequest;
}

export namespace AdminRozetkaCategoriesRequest {
  export type AsObject = {
    search: string,
  }
}

export class AdminRozetkaCategoryBindRequest extends jspb.Message {
  getItemId(): number;
  setItemId(value: number): void;

  getCategoryId(): number;
  setCategoryId(value: number): void;

  getTitle(): string;
  setTitle(value: string): void;

  getFullTitle(): string;
  setFullTitle(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminRozetkaCategoryBindRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminRozetkaCategoryBindRequest): AdminRozetkaCategoryBindRequest.AsObject;
  static serializeBinaryToWriter(message: AdminRozetkaCategoryBindRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminRozetkaCategoryBindRequest;
  static deserializeBinaryFromReader(message: AdminRozetkaCategoryBindRequest, reader: jspb.BinaryReader): AdminRozetkaCategoryBindRequest;
}

export namespace AdminRozetkaCategoryBindRequest {
  export type AsObject = {
    itemId: number,
    categoryId: number,
    title: string,
    fullTitle: string,
  }
}

export class AdminRozetkaPropertiesRequest extends jspb.Message {
  getCategoryId(): number;
  setCategoryId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminRozetkaPropertiesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminRozetkaPropertiesRequest): AdminRozetkaPropertiesRequest.AsObject;
  static serializeBinaryToWriter(message: AdminRozetkaPropertiesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminRozetkaPropertiesRequest;
  static deserializeBinaryFromReader(message: AdminRozetkaPropertiesRequest, reader: jspb.BinaryReader): AdminRozetkaPropertiesRequest;
}

export namespace AdminRozetkaPropertiesRequest {
  export type AsObject = {
    categoryId: number,
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

export class AdminUploadImagesResponse extends jspb.Message {
  getImagesList(): Array<AdminUploadImage>;
  setImagesList(value: Array<AdminUploadImage>): void;
  clearImagesList(): void;
  addImages(value?: AdminUploadImage, index?: number): AdminUploadImage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminUploadImagesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AdminUploadImagesResponse): AdminUploadImagesResponse.AsObject;
  static serializeBinaryToWriter(message: AdminUploadImagesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminUploadImagesResponse;
  static deserializeBinaryFromReader(message: AdminUploadImagesResponse, reader: jspb.BinaryReader): AdminUploadImagesResponse;
}

export namespace AdminUploadImagesResponse {
  export type AsObject = {
    imagesList: Array<AdminUploadImage.AsObject>,
  }
}

export class AdminRozetkaCategoriesResponse extends jspb.Message {
  getCategories(): string;
  setCategories(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminRozetkaCategoriesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AdminRozetkaCategoriesResponse): AdminRozetkaCategoriesResponse.AsObject;
  static serializeBinaryToWriter(message: AdminRozetkaCategoriesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminRozetkaCategoriesResponse;
  static deserializeBinaryFromReader(message: AdminRozetkaCategoriesResponse, reader: jspb.BinaryReader): AdminRozetkaCategoriesResponse;
}

export namespace AdminRozetkaCategoriesResponse {
  export type AsObject = {
    categories: string,
  }
}

export class AdminRozetkaCategoryBindResponse extends jspb.Message {
  getCategory(): AdminItemRozetkaCategory | undefined;
  setCategory(value?: AdminItemRozetkaCategory): void;
  hasCategory(): boolean;
  clearCategory(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminRozetkaCategoryBindResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AdminRozetkaCategoryBindResponse): AdminRozetkaCategoryBindResponse.AsObject;
  static serializeBinaryToWriter(message: AdminRozetkaCategoryBindResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminRozetkaCategoryBindResponse;
  static deserializeBinaryFromReader(message: AdminRozetkaCategoryBindResponse, reader: jspb.BinaryReader): AdminRozetkaCategoryBindResponse;
}

export namespace AdminRozetkaCategoryBindResponse {
  export type AsObject = {
    category?: AdminItemRozetkaCategory.AsObject,
  }
}

export class AdminRozetkaPropertiesResponse extends jspb.Message {
  getPropertiesList(): Array<AdminRozetkaProperty>;
  setPropertiesList(value: Array<AdminRozetkaProperty>): void;
  clearPropertiesList(): void;
  addProperties(value?: AdminRozetkaProperty, index?: number): AdminRozetkaProperty;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminRozetkaPropertiesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AdminRozetkaPropertiesResponse): AdminRozetkaPropertiesResponse.AsObject;
  static serializeBinaryToWriter(message: AdminRozetkaPropertiesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminRozetkaPropertiesResponse;
  static deserializeBinaryFromReader(message: AdminRozetkaPropertiesResponse, reader: jspb.BinaryReader): AdminRozetkaPropertiesResponse;
}

export namespace AdminRozetkaPropertiesResponse {
  export type AsObject = {
    propertiesList: Array<AdminRozetkaProperty.AsObject>,
  }
}

