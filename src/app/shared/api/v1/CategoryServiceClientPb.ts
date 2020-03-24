/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

import {
  AddCategoryRequest,
  CategoriesResponse,
  DeleteCategoryRequest,
  MoveCategoryRequest} from './category_pb';

export class CategoryServiceClient {
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

  methodInfoCategories = new grpcWeb.AbstractClientBase.MethodInfo(
    CategoriesResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    CategoriesResponse.deserializeBinary
  );

  categories(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: CategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.CategoryService/Categories',
      request,
      metadata || {},
      this.methodInfoCategories,
      callback);
  }

  methodInfoAddCategory = new grpcWeb.AbstractClientBase.MethodInfo(
    CategoriesResponse,
    (request: AddCategoryRequest) => {
      return request.serializeBinary();
    },
    CategoriesResponse.deserializeBinary
  );

  addCategory(
    request: AddCategoryRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: CategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.CategoryService/AddCategory',
      request,
      metadata || {},
      this.methodInfoAddCategory,
      callback);
  }

  methodInfoAddCategoryBefore = new grpcWeb.AbstractClientBase.MethodInfo(
    CategoriesResponse,
    (request: AddCategoryRequest) => {
      return request.serializeBinary();
    },
    CategoriesResponse.deserializeBinary
  );

  addCategoryBefore(
    request: AddCategoryRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: CategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.CategoryService/AddCategoryBefore',
      request,
      metadata || {},
      this.methodInfoAddCategoryBefore,
      callback);
  }

  methodInfoAddCategoryAfter = new grpcWeb.AbstractClientBase.MethodInfo(
    CategoriesResponse,
    (request: AddCategoryRequest) => {
      return request.serializeBinary();
    },
    CategoriesResponse.deserializeBinary
  );

  addCategoryAfter(
    request: AddCategoryRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: CategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.CategoryService/AddCategoryAfter',
      request,
      metadata || {},
      this.methodInfoAddCategoryAfter,
      callback);
  }

  methodInfoDeleteCategory = new grpcWeb.AbstractClientBase.MethodInfo(
    CategoriesResponse,
    (request: DeleteCategoryRequest) => {
      return request.serializeBinary();
    },
    CategoriesResponse.deserializeBinary
  );

  deleteCategory(
    request: DeleteCategoryRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: CategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.CategoryService/DeleteCategory',
      request,
      metadata || {},
      this.methodInfoDeleteCategory,
      callback);
  }

  methodInfoMoveCategory = new grpcWeb.AbstractClientBase.MethodInfo(
    CategoriesResponse,
    (request: MoveCategoryRequest) => {
      return request.serializeBinary();
    },
    CategoriesResponse.deserializeBinary
  );

  moveCategory(
    request: MoveCategoryRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: CategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.CategoryService/MoveCategory',
      request,
      metadata || {},
      this.methodInfoMoveCategory,
      callback);
  }

}

