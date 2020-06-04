/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import * as item_pb from './item_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

import {
  AddOrderRequest,
  OrderResponse} from './order_pb';

export class OrderServiceClient {
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

  methodInfoAddOrder = new grpcWeb.AbstractClientBase.MethodInfo(
    OrderResponse,
    (request: AddOrderRequest) => {
      return request.serializeBinary();
    },
    OrderResponse.deserializeBinary
  );

  addOrder(
    request: AddOrderRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: OrderResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.OrderService/AddOrder',
      request,
      metadata || {},
      this.methodInfoAddOrder,
      callback);
  }

}

