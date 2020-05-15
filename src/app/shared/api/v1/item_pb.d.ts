import * as jspb from "google-protobuf"

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as category_pb from './category_pb';
import * as property_pb from './property_pb';
import * as vendor_pb from './vendor_pb';
import * as currency_pb from './currency_pb';

export class Item extends jspb.Message {
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

  getImagesList(): Array<ItemImage>;
  setImagesList(value: Array<ItemImage>): void;
  clearImagesList(): void;
  addImages(value?: ItemImage, index?: number): ItemImage;

  getOffersList(): Array<Item>;
  setOffersList(value: Array<Item>): void;
  clearOffersList(): void;
  addOffers(value?: Item, index?: number): Item;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Item.AsObject;
  static toObject(includeInstance: boolean, msg: Item): Item.AsObject;
  static serializeBinaryToWriter(message: Item, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Item;
  static deserializeBinaryFromReader(message: Item, reader: jspb.BinaryReader): Item;
}

export namespace Item {
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
    imagesList: Array<ItemImage.AsObject>,
    offersList: Array<Item.AsObject>,
  }
}

export class ItemImage extends jspb.Message {
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
  toObject(includeInstance?: boolean): ItemImage.AsObject;
  static toObject(includeInstance: boolean, msg: ItemImage): ItemImage.AsObject;
  static serializeBinaryToWriter(message: ItemImage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemImage;
  static deserializeBinaryFromReader(message: ItemImage, reader: jspb.BinaryReader): ItemImage;
}

export namespace ItemImage {
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

export class ItemProperty extends jspb.Message {
  getCode(): string;
  setCode(value: string): void;

  getPropertyValueIdsList(): Array<number>;
  setPropertyValueIdsList(value: Array<number>): void;
  clearPropertyValueIdsList(): void;
  addPropertyValueIds(value: number, index?: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemProperty.AsObject;
  static toObject(includeInstance: boolean, msg: ItemProperty): ItemProperty.AsObject;
  static serializeBinaryToWriter(message: ItemProperty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemProperty;
  static deserializeBinaryFromReader(message: ItemProperty, reader: jspb.BinaryReader): ItemProperty;
}

export namespace ItemProperty {
  export type AsObject = {
    code: string,
    propertyValueIdsList: Array<number>,
  }
}

export class ItemRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ItemRequest): ItemRequest.AsObject;
  static serializeBinaryToWriter(message: ItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemRequest;
  static deserializeBinaryFromReader(message: ItemRequest, reader: jspb.BinaryReader): ItemRequest;
}

export namespace ItemRequest {
  export type AsObject = {
    id: number,
  }
}

export class DraftRequest extends jspb.Message {
  getParentId(): number;
  setParentId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DraftRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DraftRequest): DraftRequest.AsObject;
  static serializeBinaryToWriter(message: DraftRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DraftRequest;
  static deserializeBinaryFromReader(message: DraftRequest, reader: jspb.BinaryReader): DraftRequest;
}

export namespace DraftRequest {
  export type AsObject = {
    parentId: number,
  }
}

export class ItemsRequest extends jspb.Message {
  getPage(): number;
  setPage(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getSort(): string;
  setSort(value: string): void;

  getDirection(): string;
  setDirection(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ItemsRequest): ItemsRequest.AsObject;
  static serializeBinaryToWriter(message: ItemsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemsRequest;
  static deserializeBinaryFromReader(message: ItemsRequest, reader: jspb.BinaryReader): ItemsRequest;
}

export namespace ItemsRequest {
  export type AsObject = {
    page: number,
    pageSize: number,
    sort: string,
    direction: string,
  }
}

export class OffersRequest extends jspb.Message {
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
  toObject(includeInstance?: boolean): OffersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: OffersRequest): OffersRequest.AsObject;
  static serializeBinaryToWriter(message: OffersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OffersRequest;
  static deserializeBinaryFromReader(message: OffersRequest, reader: jspb.BinaryReader): OffersRequest;
}

export namespace OffersRequest {
  export type AsObject = {
    itemId: number,
    page: number,
    pageSize: number,
    sort: string,
    direction: string,
  }
}

export class EditItemRequest extends jspb.Message {
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

  getPropertiesList(): Array<ItemProperty>;
  setPropertiesList(value: Array<ItemProperty>): void;
  clearPropertiesList(): void;
  addProperties(value?: ItemProperty, index?: number): ItemProperty;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EditItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EditItemRequest): EditItemRequest.AsObject;
  static serializeBinaryToWriter(message: EditItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EditItemRequest;
  static deserializeBinaryFromReader(message: EditItemRequest, reader: jspb.BinaryReader): EditItemRequest;
}

export namespace EditItemRequest {
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
    propertiesList: Array<ItemProperty.AsObject>,
  }
}

export class DeleteItemRequest extends jspb.Message {
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
  toObject(includeInstance?: boolean): DeleteItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteItemRequest): DeleteItemRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteItemRequest;
  static deserializeBinaryFromReader(message: DeleteItemRequest, reader: jspb.BinaryReader): DeleteItemRequest;
}

export namespace DeleteItemRequest {
  export type AsObject = {
    id: number,
    page: number,
    pageSize: number,
    sort: string,
    direction: string,
  }
}

export class DeleteOfferRequest extends jspb.Message {
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
  toObject(includeInstance?: boolean): DeleteOfferRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteOfferRequest): DeleteOfferRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteOfferRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteOfferRequest;
  static deserializeBinaryFromReader(message: DeleteOfferRequest, reader: jspb.BinaryReader): DeleteOfferRequest;
}

export namespace DeleteOfferRequest {
  export type AsObject = {
    id: number,
    parentId: number,
    page: number,
    pageSize: number,
    sort: string,
    direction: string,
  }
}

export class ItemBindRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getCategoryId(): string;
  setCategoryId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemBindRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ItemBindRequest): ItemBindRequest.AsObject;
  static serializeBinaryToWriter(message: ItemBindRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemBindRequest;
  static deserializeBinaryFromReader(message: ItemBindRequest, reader: jspb.BinaryReader): ItemBindRequest;
}

export namespace ItemBindRequest {
  export type AsObject = {
    id: number,
    categoryId: string,
  }
}

export class UploadOfferRequest extends jspb.Message {
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
  toObject(includeInstance?: boolean): UploadOfferRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UploadOfferRequest): UploadOfferRequest.AsObject;
  static serializeBinaryToWriter(message: UploadOfferRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadOfferRequest;
  static deserializeBinaryFromReader(message: UploadOfferRequest, reader: jspb.BinaryReader): UploadOfferRequest;
}

export namespace UploadOfferRequest {
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

export class ItemResponse extends jspb.Message {
  getItem(): Item | undefined;
  setItem(value?: Item): void;
  hasItem(): boolean;
  clearItem(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ItemResponse): ItemResponse.AsObject;
  static serializeBinaryToWriter(message: ItemResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemResponse;
  static deserializeBinaryFromReader(message: ItemResponse, reader: jspb.BinaryReader): ItemResponse;
}

export namespace ItemResponse {
  export type AsObject = {
    item?: Item.AsObject,
  }
}

export class ItemsResponse extends jspb.Message {
  getItemsList(): Array<Item>;
  setItemsList(value: Array<Item>): void;
  clearItemsList(): void;
  addItems(value?: Item, index?: number): Item;

  getTotal(): number;
  setTotal(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ItemsResponse): ItemsResponse.AsObject;
  static serializeBinaryToWriter(message: ItemsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemsResponse;
  static deserializeBinaryFromReader(message: ItemsResponse, reader: jspb.BinaryReader): ItemsResponse;
}

export namespace ItemsResponse {
  export type AsObject = {
    itemsList: Array<Item.AsObject>,
    total: number,
  }
}

export class OffersResponse extends jspb.Message {
  getOffersList(): Array<Item>;
  setOffersList(value: Array<Item>): void;
  clearOffersList(): void;
  addOffers(value?: Item, index?: number): Item;

  getTotal(): number;
  setTotal(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OffersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: OffersResponse): OffersResponse.AsObject;
  static serializeBinaryToWriter(message: OffersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OffersResponse;
  static deserializeBinaryFromReader(message: OffersResponse, reader: jspb.BinaryReader): OffersResponse;
}

export namespace OffersResponse {
  export type AsObject = {
    offersList: Array<Item.AsObject>,
    total: number,
  }
}

export class ItemImagesResponse extends jspb.Message {
  getImagesList(): Array<ItemImage>;
  setImagesList(value: Array<ItemImage>): void;
  clearImagesList(): void;
  addImages(value?: ItemImage, index?: number): ItemImage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemImagesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ItemImagesResponse): ItemImagesResponse.AsObject;
  static serializeBinaryToWriter(message: ItemImagesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemImagesResponse;
  static deserializeBinaryFromReader(message: ItemImagesResponse, reader: jspb.BinaryReader): ItemImagesResponse;
}

export namespace ItemImagesResponse {
  export type AsObject = {
    imagesList: Array<ItemImage.AsObject>,
  }
}

