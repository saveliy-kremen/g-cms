/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as admin$category_pb from './admin-category_pb';

import {
  AdminDeletePropertyRequest,
  AdminEditPropertyRequest,
  AdminEditPropertyValueRequest,
  AdminPropertiesRequest,
  AdminPropertiesResponse,
  AdminPropertyBindRequest,
  AdminPropertyRequest,
  AdminPropertyResponse,
  AdminPropertyValueRequest,
  AdminUploadPropertyRequest} from './admin-property_pb';

export class AdminPropertyServiceClient {
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

  methodInfoAdminProperty = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminPropertyResponse,
    (request: AdminPropertyRequest) => {
      return request.serializeBinary();
    },
    AdminPropertyResponse.deserializeBinary
  );

  adminProperty(
    request: AdminPropertyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminPropertyResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminPropertyService/AdminProperty',
      request,
      metadata || {},
      this.methodInfoAdminProperty,
      callback);
  }

  methodInfoAdminProperties = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminPropertiesResponse,
    (request: AdminPropertiesRequest) => {
      return request.serializeBinary();
    },
    AdminPropertiesResponse.deserializeBinary
  );

  adminProperties(
    request: AdminPropertiesRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminPropertiesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminPropertyService/AdminProperties',
      request,
      metadata || {},
      this.methodInfoAdminProperties,
      callback);
  }

  methodInfoAdminEditProperty = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminPropertyResponse,
    (request: AdminEditPropertyRequest) => {
      return request.serializeBinary();
    },
    AdminPropertyResponse.deserializeBinary
  );

  adminEditProperty(
    request: AdminEditPropertyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminPropertyResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminPropertyService/AdminEditProperty',
      request,
      metadata || {},
      this.methodInfoAdminEditProperty,
      callback);
  }

  methodInfoAdminDeleteProperty = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminPropertiesResponse,
    (request: AdminDeletePropertyRequest) => {
      return request.serializeBinary();
    },
    AdminPropertiesResponse.deserializeBinary
  );

  adminDeleteProperty(
    request: AdminDeletePropertyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminPropertiesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminPropertyService/AdminDeleteProperty',
      request,
      metadata || {},
      this.methodInfoAdminDeleteProperty,
      callback);
  }

  methodInfoAdminEditPropertyValue = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminPropertyResponse,
    (request: AdminEditPropertyValueRequest) => {
      return request.serializeBinary();
    },
    AdminPropertyResponse.deserializeBinary
  );

  adminEditPropertyValue(
    request: AdminEditPropertyValueRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminPropertyResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminPropertyService/AdminEditPropertyValue',
      request,
      metadata || {},
      this.methodInfoAdminEditPropertyValue,
      callback);
  }

  methodInfoAdminDeletePropertyValue = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminPropertyResponse,
    (request: AdminPropertyValueRequest) => {
      return request.serializeBinary();
    },
    AdminPropertyResponse.deserializeBinary
  );

  adminDeletePropertyValue(
    request: AdminPropertyValueRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminPropertyResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminPropertyService/AdminDeletePropertyValue',
      request,
      metadata || {},
      this.methodInfoAdminDeletePropertyValue,
      callback);
  }

  methodInfoAdminPropertyCategories = new grpcWeb.AbstractClientBase.MethodInfo(
    admin$category_pb.AdminCategoriesResponse,
    (request: AdminPropertyRequest) => {
      return request.serializeBinary();
    },
    admin$category_pb.AdminCategoriesResponse.deserializeBinary
  );

  adminPropertyCategories(
    request: AdminPropertyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: admin$category_pb.AdminCategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminPropertyService/AdminPropertyCategories',
      request,
      metadata || {},
      this.methodInfoAdminPropertyCategories,
      callback);
  }

  methodInfoAdminPropertyBindCategory = new grpcWeb.AbstractClientBase.MethodInfo(
    admin$category_pb.AdminCategoriesResponse,
    (request: AdminPropertyBindRequest) => {
      return request.serializeBinary();
    },
    admin$category_pb.AdminCategoriesResponse.deserializeBinary
  );

  adminPropertyBindCategory(
    request: AdminPropertyBindRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: admin$category_pb.AdminCategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminPropertyService/AdminPropertyBindCategory',
      request,
      metadata || {},
      this.methodInfoAdminPropertyBindCategory,
      callback);
  }

  methodInfoAdminPropertyUnbindCategory = new grpcWeb.AbstractClientBase.MethodInfo(
    admin$category_pb.AdminCategoriesResponse,
    (request: AdminPropertyBindRequest) => {
      return request.serializeBinary();
    },
    admin$category_pb.AdminCategoriesResponse.deserializeBinary
  );

  adminPropertyUnbindCategory(
    request: AdminPropertyBindRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: admin$category_pb.AdminCategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminPropertyService/AdminPropertyUnbindCategory',
      request,
      metadata || {},
      this.methodInfoAdminPropertyUnbindCategory,
      callback);
  }

  methodInfoAdminUploadProperty = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminPropertyResponse,
    (request: AdminUploadPropertyRequest) => {
      return request.serializeBinary();
    },
    AdminPropertyResponse.deserializeBinary
  );

  adminUploadProperty(
    request: AdminUploadPropertyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminPropertyResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminPropertyService/AdminUploadProperty',
      request,
      metadata || {},
      this.methodInfoAdminUploadProperty,
      callback);
  }

}

