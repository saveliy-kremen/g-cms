/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as category_pb from './category_pb';

import {
  DeleteItemRequest,
  EditItemRequest,
  ItemImagesResponse,
  ItemRequest,
  ItemResponse,
  ItemsRequest,
  ItemsResponse} from './item_pb';

export class ItemServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoItem = new grpcWeb.AbstractClientBase.MethodInfo(
    ItemResponse,
    (request: ItemRequest) => {
      return request.serializeBinary();
    },
    ItemResponse.deserializeBinary
  );

  item(
    request: ItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ItemResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ItemService/Item',
      request,
      metadata || {},
      this.methodInfoItem,
      callback);
  }

  methodInfoEditItem = new grpcWeb.AbstractClientBase.MethodInfo(
    ItemResponse,
    (request: EditItemRequest) => {
      return request.serializeBinary();
    },
    ItemResponse.deserializeBinary
  );

  editItem(
    request: EditItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ItemResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ItemService/EditItem',
      request,
      metadata || {},
      this.methodInfoEditItem,
      callback);
  }

  methodInfoDeleteItem = new grpcWeb.AbstractClientBase.MethodInfo(
    ItemsResponse,
    (request: DeleteItemRequest) => {
      return request.serializeBinary();
    },
    ItemsResponse.deserializeBinary
  );

  deleteItem(
    request: DeleteItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ItemsResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ItemService/DeleteItem',
      request,
      metadata || {},
      this.methodInfoDeleteItem,
      callback);
  }

  methodInfoItems = new grpcWeb.AbstractClientBase.MethodInfo(
    ItemsResponse,
    (request: ItemsRequest) => {
      return request.serializeBinary();
    },
    ItemsResponse.deserializeBinary
  );

  items(
    request: ItemsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ItemsResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ItemService/Items',
      request,
      metadata || {},
      this.methodInfoItems,
      callback);
  }

  methodInfoGetUploadImages = new grpcWeb.AbstractClientBase.MethodInfo(
    ItemImagesResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    ItemImagesResponse.deserializeBinary
  );

  getUploadImages(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ItemImagesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ItemService/GetUploadImages',
      request,
      metadata || {},
      this.methodInfoGetUploadImages,
      callback);
  }

}

