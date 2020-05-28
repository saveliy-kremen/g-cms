/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as category_pb from './category_pb';
import * as property_pb from './property_pb';
import * as vendor_pb from './vendor_pb';
import * as currency_pb from './currency_pb';

import {
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

}

