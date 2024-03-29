/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

import {
  CategoriesResponse,
  CategoryRequest,
  CategoryResponse} from './category_pb';

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

  methodInfoCategory = new grpcWeb.AbstractClientBase.MethodInfo(
    CategoryResponse,
    (request: CategoryRequest) => {
      return request.serializeBinary();
    },
    CategoryResponse.deserializeBinary
  );

  category(
    request: CategoryRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: CategoryResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.CategoryService/Category',
      request,
      metadata || {},
      this.methodInfoCategory,
      callback);
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

}

