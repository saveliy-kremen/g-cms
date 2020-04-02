import * as jspb from "google-protobuf"

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as category_pb from './category_pb';

export class Item extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getUserid(): number;
  setUserid(value: number): void;

  getVendorid(): number;
  setVendorid(value: number): void;

  getParentid(): number;
  setParentid(value: number): void;

  getCategoryid(): number;
  setCategoryid(value: number): void;

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

  getOldprice(): number;
  setOldprice(value: number): void;

  getCurrencyid(): number;
  setCurrencyid(value: number): void;

  getCount(): number;
  setCount(value: number): void;

  getDisable(): boolean;
  setDisable(value: boolean): void;

  getSort(): number;
  setSort(value: number): void;

  getSeotitle(): string;
  setSeotitle(value: string): void;

  getSeodescription(): string;
  setSeodescription(value: string): void;

  getSeokeywords(): string;
  setSeokeywords(value: string): void;

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
    userid: number,
    vendorid: number,
    parentid: number,
    categoryid: number,
    title: string,
    article: string,
    alias: string,
    description: string,
    price: number,
    oldprice: number,
    currencyid: number,
    count: number,
    disable: boolean,
    sort: number,
    seotitle: string,
    seodescription: string,
    seokeywords: string,
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

  getPagesize(): number;
  setPagesize(value: number): void;

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
    pagesize: number,
    sort: string,
    direction: string,
  }
}

export class EditItemRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getTitle(): string;
  setTitle(value: string): void;

  getArticle(): string;
  setArticle(value: string): void;

  getAlias(): string;
  setAlias(value: string): void;

  getCount(): number;
  setCount(value: number): void;

  getDescription(): string;
  setDescription(value: string): void;

  getPrice(): number;
  setPrice(value: number): void;

  getOldprice(): number;
  setOldprice(value: number): void;

  getCurrencyid(): number;
  setCurrencyid(value: number): void;

  getDisable(): boolean;
  setDisable(value: boolean): void;

  getSort(): number;
  setSort(value: number): void;

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
    title: string,
    article: string,
    alias: string,
    count: number,
    description: string,
    price: number,
    oldprice: number,
    currencyid: number,
    disable: boolean,
    sort: number,
  }
}

export class DeleteItemRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  getPagesize(): number;
  setPagesize(value: number): void;

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
    pagesize: number,
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

