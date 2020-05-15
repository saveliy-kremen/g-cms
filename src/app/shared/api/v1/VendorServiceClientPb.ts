/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import {
  VendorRequest,
  VendorResponse,
  VendorsRequest,
  VendorsResponse} from './vendor_pb';

export class VendorServiceClient {
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

  methodInfoVendor = new grpcWeb.AbstractClientBase.MethodInfo(
    VendorResponse,
    (request: VendorRequest) => {
      return request.serializeBinary();
    },
    VendorResponse.deserializeBinary
  );

  vendor(
    request: VendorRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: VendorResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.VendorService/Vendor',
      request,
      metadata || {},
      this.methodInfoVendor,
      callback);
  }

  methodInfoVendors = new grpcWeb.AbstractClientBase.MethodInfo(
    VendorsResponse,
    (request: VendorsRequest) => {
      return request.serializeBinary();
    },
    VendorsResponse.deserializeBinary
  );

  vendors(
    request: VendorsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: VendorsResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.VendorService/Vendors',
      request,
      metadata || {},
      this.methodInfoVendors,
      callback);
  }

}

