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
  DeletePropertyRequest,
  EditPropertyRequest,
  EditPropertyValueRequest,
  PropertiesRequest,
  PropertiesResponse,
  PropertyBindRequest,
  PropertyRequest,
  PropertyResponse,
  PropertyValueRequest,
  UploadPropertyRequest} from './property_pb';

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
    (request: PropertyRequest) => {
      return request.serializeBinary();
    },
    PropertyResponse.deserializeBinary
  );

  property(
    request: PropertyRequest,
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
    (request: PropertiesRequest) => {
      return request.serializeBinary();
    },
    PropertiesResponse.deserializeBinary
  );

  properties(
    request: PropertiesRequest,
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

  methodInfoDeleteProperty = new grpcWeb.AbstractClientBase.MethodInfo(
    PropertiesResponse,
    (request: DeletePropertyRequest) => {
      return request.serializeBinary();
    },
    PropertiesResponse.deserializeBinary
  );

  deleteProperty(
    request: DeletePropertyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: PropertiesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.PropertyService/DeleteProperty',
      request,
      metadata || {},
      this.methodInfoDeleteProperty,
      callback);
  }

  methodInfoEditPropertyValue = new grpcWeb.AbstractClientBase.MethodInfo(
    PropertyResponse,
    (request: EditPropertyValueRequest) => {
      return request.serializeBinary();
    },
    PropertyResponse.deserializeBinary
  );

  editPropertyValue(
    request: EditPropertyValueRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: PropertyResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.PropertyService/EditPropertyValue',
      request,
      metadata || {},
      this.methodInfoEditPropertyValue,
      callback);
  }

  methodInfoDeletePropertyValue = new grpcWeb.AbstractClientBase.MethodInfo(
    PropertyResponse,
    (request: PropertyValueRequest) => {
      return request.serializeBinary();
    },
    PropertyResponse.deserializeBinary
  );

  deletePropertyValue(
    request: PropertyValueRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: PropertyResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.PropertyService/DeletePropertyValue',
      request,
      metadata || {},
      this.methodInfoDeletePropertyValue,
      callback);
  }

  methodInfoPropertyCategories = new grpcWeb.AbstractClientBase.MethodInfo(
    category_pb.CategoriesResponse,
    (request: PropertyRequest) => {
      return request.serializeBinary();
    },
    category_pb.CategoriesResponse.deserializeBinary
  );

  propertyCategories(
    request: PropertyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: category_pb.CategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.PropertyService/PropertyCategories',
      request,
      metadata || {},
      this.methodInfoPropertyCategories,
      callback);
  }

  methodInfoPropertyBindCategory = new grpcWeb.AbstractClientBase.MethodInfo(
    category_pb.CategoriesResponse,
    (request: PropertyBindRequest) => {
      return request.serializeBinary();
    },
    category_pb.CategoriesResponse.deserializeBinary
  );

  propertyBindCategory(
    request: PropertyBindRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: category_pb.CategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.PropertyService/PropertyBindCategory',
      request,
      metadata || {},
      this.methodInfoPropertyBindCategory,
      callback);
  }

  methodInfoPropertyUnbindCategory = new grpcWeb.AbstractClientBase.MethodInfo(
    category_pb.CategoriesResponse,
    (request: PropertyBindRequest) => {
      return request.serializeBinary();
    },
    category_pb.CategoriesResponse.deserializeBinary
  );

  propertyUnbindCategory(
    request: PropertyBindRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: category_pb.CategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.PropertyService/PropertyUnbindCategory',
      request,
      metadata || {},
      this.methodInfoPropertyUnbindCategory,
      callback);
  }

  methodInfoUploadProperty = new grpcWeb.AbstractClientBase.MethodInfo(
    PropertyResponse,
    (request: UploadPropertyRequest) => {
      return request.serializeBinary();
    },
    PropertyResponse.deserializeBinary
  );

  uploadProperty(
    request: UploadPropertyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: PropertyResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.PropertyService/UploadProperty',
      request,
      metadata || {},
      this.methodInfoUploadProperty,
      callback);
  }

}

