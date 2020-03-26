/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

import {
  EditPropertyRequest,
  PropertiesResponse,
  PropertyResponse} from './property_pb';

export class PropertyServiceClient {
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

  methodInfoProperty = new grpcWeb.AbstractClientBase.MethodInfo(
    PropertyResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    PropertyResponse.deserializeBinary
  );

  property(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: PropertyResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.PropertyService/Property',
      request,
      metadata || {},
      this.methodInfoProperty,
      callback);
  }

  methodInfoProperties = new grpcWeb.AbstractClientBase.MethodInfo(
    PropertiesResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    PropertiesResponse.deserializeBinary
  );

  properties(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: PropertiesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.PropertyService/Properties',
      request,
      metadata || {},
      this.methodInfoProperties,
      callback);
  }

  methodInfoEditProperty = new grpcWeb.AbstractClientBase.MethodInfo(
    PropertyResponse,
    (request: EditPropertyRequest) => {
      return request.serializeBinary();
    },
    PropertyResponse.deserializeBinary
  );

  editProperty(
    request: EditPropertyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: PropertyResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.PropertyService/EditProperty',
      request,
      metadata || {},
      this.methodInfoEditProperty,
      callback);
  }

}

