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

  getProperties(): property_pb.Property | undefined;
  setProperties(value?: property_pb.Property): void;
  hasProperties(): boolean;
  clearProperties(): void;

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
    properties?: property_pb.Property.AsObject,
    vendor?: vendor_pb.Vendor.AsObject,
    currency?: currency_pb.Currency.AsObject,
    imagesList: Array<ItemImage.AsObject>,
    offersList: Array<Item.AsObject>,
  }
}

export class ItemImage extends jspb.Message {
  getFilename(): string;
  setFilename(value: string): void;

  getPropertyValueId(): number;
  setPropertyValueId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemImage.AsObject;
  static toObject(includeInstance: boolean, msg: ItemImage): ItemImage.AsObject;
  static serializeBinaryToWriter(message: ItemImage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemImage;
  static deserializeBinaryFromReader(message: ItemImage, reader: jspb.BinaryReader): ItemImage;
}

export namespace ItemImage {
  export type AsObject = {
    filename: string,
    propertyValueId: number,
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

