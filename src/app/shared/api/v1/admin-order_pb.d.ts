import * as jspb from "google-protobuf"

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';
import * as admin$item_pb from './admin-item_pb';

export class AdminOrder extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getPhone(): string;
  setPhone(value: string): void;

  getAddress(): string;
  setAddress(value: string): void;

  getPayment(): string;
  setPayment(value: string): void;

  getDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setDate(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasDate(): boolean;
  clearDate(): void;

  getItemsList(): Array<admin$item_pb.AdminItem>;
  setItemsList(value: Array<admin$item_pb.AdminItem>): void;
  clearItemsList(): void;
  addItems(value?: admin$item_pb.AdminItem, index?: number): admin$item_pb.AdminItem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminOrder.AsObject;
  static toObject(includeInstance: boolean, msg: AdminOrder): AdminOrder.AsObject;
  static serializeBinaryToWriter(message: AdminOrder, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminOrder;
  static deserializeBinaryFromReader(message: AdminOrder, reader: jspb.BinaryReader): AdminOrder;
}

export namespace AdminOrder {
  export type AsObject = {
    id: string,
    name: string,
    phone: string,
    address: string,
    payment: string,
    date?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    itemsList: Array<admin$item_pb.AdminItem.AsObject>,
  }
}

export class AdminOrderRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminOrderRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminOrderRequest): AdminOrderRequest.AsObject;
  static serializeBinaryToWriter(message: AdminOrderRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminOrderRequest;
  static deserializeBinaryFromReader(message: AdminOrderRequest, reader: jspb.BinaryReader): AdminOrderRequest;
}

export namespace AdminOrderRequest {
  export type AsObject = {
    id: number,
  }
}

export class AdminOrdersRequest extends jspb.Message {
  getPage(): number;
  setPage(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getSort(): string;
  setSort(value: string): void;

  getDirection(): string;
  setDirection(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminOrdersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminOrdersRequest): AdminOrdersRequest.AsObject;
  static serializeBinaryToWriter(message: AdminOrdersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminOrdersRequest;
  static deserializeBinaryFromReader(message: AdminOrdersRequest, reader: jspb.BinaryReader): AdminOrdersRequest;
}

export namespace AdminOrdersRequest {
  export type AsObject = {
    page: number,
    pageSize: number,
    sort: string,
    direction: string,
  }
}

export class AdminDeleteOrderRequest extends jspb.Message {
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
  toObject(includeInstance?: boolean): AdminDeleteOrderRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminDeleteOrderRequest): AdminDeleteOrderRequest.AsObject;
  static serializeBinaryToWriter(message: AdminDeleteOrderRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminDeleteOrderRequest;
  static deserializeBinaryFromReader(message: AdminDeleteOrderRequest, reader: jspb.BinaryReader): AdminDeleteOrderRequest;
}

export namespace AdminDeleteOrderRequest {
  export type AsObject = {
    id: number,
    page: number,
    pageSize: number,
    sort: string,
    direction: string,
  }
}

export class AdminOrderResponse extends jspb.Message {
  getOrder(): AdminOrder | undefined;
  setOrder(value?: AdminOrder): void;
  hasOrder(): boolean;
  clearOrder(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminOrderResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AdminOrderResponse): AdminOrderResponse.AsObject;
  static serializeBinaryToWriter(message: AdminOrderResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminOrderResponse;
  static deserializeBinaryFromReader(message: AdminOrderResponse, reader: jspb.BinaryReader): AdminOrderResponse;
}

export namespace AdminOrderResponse {
  export type AsObject = {
    order?: AdminOrder.AsObject,
  }
}

export class AdminOrdersResponse extends jspb.Message {
  getOrdersList(): Array<AdminOrder>;
  setOrdersList(value: Array<AdminOrder>): void;
  clearOrdersList(): void;
  addOrders(value?: AdminOrder, index?: number): AdminOrder;

  getTotal(): number;
  setTotal(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminOrdersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AdminOrdersResponse): AdminOrdersResponse.AsObject;
  static serializeBinaryToWriter(message: AdminOrdersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminOrdersResponse;
  static deserializeBinaryFromReader(message: AdminOrdersResponse, reader: jspb.BinaryReader): AdminOrdersResponse;
}

export namespace AdminOrdersResponse {
  export type AsObject = {
    ordersList: Array<AdminOrder.AsObject>,
    total: number,
  }
}

