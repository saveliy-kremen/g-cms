/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

import {
  DataRequest,
  DataResponse} from './esp8266_pb';

export class Esp8266ServiceClient {
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

  methodInfoSendData = new grpcWeb.AbstractClientBase.MethodInfo(
    DataResponse,
    (request: DataRequest) => {
      return request.serializeBinary();
    },
    DataResponse.deserializeBinary
  );

  sendData(
    request: DataRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: DataResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.Esp8266Service/SendData',
      request,
      metadata || {},
      this.methodInfoSendData,
      callback);
  }

}

