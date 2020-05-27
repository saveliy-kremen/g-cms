/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

import {
  AdminAddCategoryRequest,
  AdminCategoriesResponse,
  AdminCategoryRequest,
  AdminCategoryResponse,
  AdminDeleteCategoryRequest,
  AdminEditCategoryRequest,
  AdminMoveCategoryRequest,
  AdminUploadCategoryRequest} from './admin-category_pb';

export class AdminCategoryServiceClient {
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

  methodInfoAdminCategory = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminCategoryResponse,
    (request: AdminCategoryRequest) => {
      return request.serializeBinary();
    },
    AdminCategoryResponse.deserializeBinary
  );

  adminCategory(
    request: AdminCategoryRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminCategoryResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminCategoryService/AdminCategory',
      request,
      metadata || {},
      this.methodInfoAdminCategory,
      callback);
  }

  methodInfoAdminCategories = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminCategoriesResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    AdminCategoriesResponse.deserializeBinary
  );

  adminCategories(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminCategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminCategoryService/AdminCategories',
      request,
      metadata || {},
      this.methodInfoAdminCategories,
      callback);
  }

  methodInfoAdminAddCategory = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminCategoriesResponse,
    (request: AdminAddCategoryRequest) => {
      return request.serializeBinary();
    },
    AdminCategoriesResponse.deserializeBinary
  );

  adminAddCategory(
    request: AdminAddCategoryRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminCategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminCategoryService/AdminAddCategory',
      request,
      metadata || {},
      this.methodInfoAdminAddCategory,
      callback);
  }

  methodInfoAdminAddCategoryBefore = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminCategoriesResponse,
    (request: AdminAddCategoryRequest) => {
      return request.serializeBinary();
    },
    AdminCategoriesResponse.deserializeBinary
  );

  adminAddCategoryBefore(
    request: AdminAddCategoryRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminCategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminCategoryService/AdminAddCategoryBefore',
      request,
      metadata || {},
      this.methodInfoAdminAddCategoryBefore,
      callback);
  }

  methodInfoAdminAddCategoryAfter = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminCategoriesResponse,
    (request: AdminAddCategoryRequest) => {
      return request.serializeBinary();
    },
    AdminCategoriesResponse.deserializeBinary
  );

  adminAddCategoryAfter(
    request: AdminAddCategoryRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminCategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminCategoryService/AdminAddCategoryAfter',
      request,
      metadata || {},
      this.methodInfoAdminAddCategoryAfter,
      callback);
  }

  methodInfoAdminDeleteCategory = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminCategoriesResponse,
    (request: AdminDeleteCategoryRequest) => {
      return request.serializeBinary();
    },
    AdminCategoriesResponse.deserializeBinary
  );

  adminDeleteCategory(
    request: AdminDeleteCategoryRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminCategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminCategoryService/AdminDeleteCategory',
      request,
      metadata || {},
      this.methodInfoAdminDeleteCategory,
      callback);
  }

  methodInfoAdminMoveCategory = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminCategoriesResponse,
    (request: AdminMoveCategoryRequest) => {
      return request.serializeBinary();
    },
    AdminCategoriesResponse.deserializeBinary
  );

  adminMoveCategory(
    request: AdminMoveCategoryRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminCategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminCategoryService/AdminMoveCategory',
      request,
      metadata || {},
      this.methodInfoAdminMoveCategory,
      callback);
  }

  methodInfoAdminEditCategory = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminCategoryResponse,
    (request: AdminEditCategoryRequest) => {
      return request.serializeBinary();
    },
    AdminCategoryResponse.deserializeBinary
  );

  adminEditCategory(
    request: AdminEditCategoryRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminCategoryResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminCategoryService/AdminEditCategory',
      request,
      metadata || {},
      this.methodInfoAdminEditCategory,
      callback);
  }

  methodInfoAdminUploadCategory = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminCategoryResponse,
    (request: AdminUploadCategoryRequest) => {
      return request.serializeBinary();
    },
    AdminCategoryResponse.deserializeBinary
  );

  adminUploadCategory(
    request: AdminUploadCategoryRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminCategoryResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminCategoryService/AdminUploadCategory',
      request,
      metadata || {},
      this.methodInfoAdminUploadCategory,
      callback);
  }

}

