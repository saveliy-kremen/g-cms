import * as jspb from "google-protobuf"

import * as item_pb from './item_pb';

export class Order extends jspb.Message {
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

  getItemsList(): Array<item_pb.Item>;
  setItemsList(value: Array<item_pb.Item>): void;
  clearItemsList(): void;
  addItems(value?: item_pb.Item, index?: number): item_pb.Item;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Order.AsObject;
  static toObject(includeInstance: boolean, msg: Order): Order.AsObject;
  static serializeBinaryToWriter(message: Order, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Order;
  static deserializeBinaryFromReader(message: Order, reader: jspb.BinaryReader): Order;
}

export namespace Order {
  export type AsObject = {
    id: string,
    name: string,
    phone: string,
    address: string,
    payment: string,
    itemsList: Array<item_pb.Item.AsObject>,
  }
}

export class AddOrderRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getPhone(): string;
  setPhone(value: string): void;

  getAddress(): string;
  setAddress(value: string): void;

  getPayment(): string;
  setPayment(value: string): void;

  getItemIdList(): Array<number>;
  setItemIdList(value: Array<number>): void;
  clearItemIdList(): void;
  addItemId(value: number, index?: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddOrderRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddOrderRequest): AddOrderRequest.AsObject;
  static serializeBinaryToWriter(message: AddOrderRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddOrderRequest;
  static deserializeBinaryFromReader(message: AddOrderRequest, reader: jspb.BinaryReader): AddOrderRequest;
}

export namespace AddOrderRequest {
  export type AsObject = {
    name: string,
    phone: string,
    address: string,
    payment: string,
    itemIdList: Array<number>,
  }
}

export class OrderResponse extends jspb.Message {
  getOrder(): Order | undefined;
  setOrder(value?: Order): void;
  hasOrder(): boolean;
  clearOrder(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OrderResponse.AsObject;
  static toObject(includeInstance: boolean, msg: OrderResponse): OrderResponse.AsObject;
  static serializeBinaryToWriter(message: OrderResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OrderResponse;
  static deserializeBinaryFromReader(message: OrderResponse, reader: jspb.BinaryReader): OrderResponse;
}

export namespace OrderResponse {
  export type AsObject = {
    order?: Order.AsObject,
  }
}

