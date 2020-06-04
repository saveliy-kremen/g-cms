/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';
import * as admin$item_pb from './admin-item_pb';

import {
  AdminDeleteOrderRequest,
  AdminOrderRequest,
  AdminOrderResponse,
  AdminOrdersRequest,
  AdminOrdersResponse} from './admin-order_pb';

export class AdminOrderServiceClient {
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

  methodInfoAdminOrder = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminOrderResponse,
    (request: AdminOrderRequest) => {
      return request.serializeBinary();
    },
    AdminOrderResponse.deserializeBinary
  );

  adminOrder(
    request: AdminOrderRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminOrderResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminOrderService/AdminOrder',
      request,
      metadata || {},
      this.methodInfoAdminOrder,
      callback);
  }

  methodInfoAdminOrders = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminOrdersResponse,
    (request: AdminOrdersRequest) => {
      return request.serializeBinary();
    },
    AdminOrdersResponse.deserializeBinary
  );

  adminOrders(
    request: AdminOrdersRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminOrdersResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminOrderService/AdminOrders',
      request,
      metadata || {},
      this.methodInfoAdminOrders,
      callback);
  }

  methodInfoAdminDeleteOrder = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminOrdersResponse,
    (request: AdminDeleteOrderRequest) => {
      return request.serializeBinary();
    },
    AdminOrdersResponse.deserializeBinary
  );

  adminDeleteOrder(
    request: AdminDeleteOrderRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminOrdersResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminOrderService/AdminDeleteOrder',
      request,
      metadata || {},
      this.methodInfoAdminDeleteOrder,
      callback);
  }

}

