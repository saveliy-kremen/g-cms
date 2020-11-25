/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as admin$category_pb from './admin-category_pb';
import * as admin$property_pb from './admin-property_pb';
import * as vendor_pb from './vendor_pb';
import * as currency_pb from './currency_pb';

import {
  AdminDeleteItemRequest,
  AdminDeleteOfferRequest,
  AdminDraftRequest,
  AdminEditItemRequest,
  AdminItemBindRequest,
  AdminItemRequest,
  AdminItemResponse,
  AdminItemsRequest,
  AdminItemsResponse,
  AdminOffersRequest,
  AdminOffersResponse,
  AdminRozetkaCategoriesRequest,
  AdminRozetkaCategoriesResponse,
  AdminRozetkaCategoryBindRequest,
  AdminRozetkaCategoryBindResponse,
  AdminRozetkaPropertiesRequest,
  AdminRozetkaPropertiesResponse,
  AdminUploadImagesResponse,
  AdminUploadOfferRequest} from './admin-item_pb';

export class AdminItemServiceClient {
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

  methodInfoAdminItem = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminItemResponse,
    (request: AdminItemRequest) => {
      return request.serializeBinary();
    },
    AdminItemResponse.deserializeBinary
  );

  adminItem(
    request: AdminItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminItemResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminItemService/AdminItem',
      request,
      metadata || {},
      this.methodInfoAdminItem,
      callback);
  }

  methodInfoAdminCreateDraftItem = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminItemResponse,
    (request: AdminDraftRequest) => {
      return request.serializeBinary();
    },
    AdminItemResponse.deserializeBinary
  );

  adminCreateDraftItem(
    request: AdminDraftRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminItemResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminItemService/AdminCreateDraftItem',
      request,
      metadata || {},
      this.methodInfoAdminCreateDraftItem,
      callback);
  }

  methodInfoAdminEditItem = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminItemResponse,
    (request: AdminEditItemRequest) => {
      return request.serializeBinary();
    },
    AdminItemResponse.deserializeBinary
  );

  adminEditItem(
    request: AdminEditItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminItemResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminItemService/AdminEditItem',
      request,
      metadata || {},
      this.methodInfoAdminEditItem,
      callback);
  }

  methodInfoAdminDeleteItem = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminItemsResponse,
    (request: AdminDeleteItemRequest) => {
      return request.serializeBinary();
    },
    AdminItemsResponse.deserializeBinary
  );

  adminDeleteItem(
    request: AdminDeleteItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminItemsResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminItemService/AdminDeleteItem',
      request,
      metadata || {},
      this.methodInfoAdminDeleteItem,
      callback);
  }

  methodInfoAdminDeleteOffer = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminOffersResponse,
    (request: AdminDeleteOfferRequest) => {
      return request.serializeBinary();
    },
    AdminOffersResponse.deserializeBinary
  );

  adminDeleteOffer(
    request: AdminDeleteOfferRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminOffersResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminItemService/AdminDeleteOffer',
      request,
      metadata || {},
      this.methodInfoAdminDeleteOffer,
      callback);
  }

  methodInfoAdminItems = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminItemsResponse,
    (request: AdminItemsRequest) => {
      return request.serializeBinary();
    },
    AdminItemsResponse.deserializeBinary
  );

  adminItems(
    request: AdminItemsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminItemsResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminItemService/AdminItems',
      request,
      metadata || {},
      this.methodInfoAdminItems,
      callback);
  }

  methodInfoAdminGetUploadImages = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminUploadImagesResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    AdminUploadImagesResponse.deserializeBinary
  );

  adminGetUploadImages(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminUploadImagesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminItemService/AdminGetUploadImages',
      request,
      metadata || {},
      this.methodInfoAdminGetUploadImages,
      callback);
  }

  methodInfoAdminItemCategories = new grpcWeb.AbstractClientBase.MethodInfo(
    admin$category_pb.AdminCategoriesResponse,
    (request: AdminItemRequest) => {
      return request.serializeBinary();
    },
    admin$category_pb.AdminCategoriesResponse.deserializeBinary
  );

  adminItemCategories(
    request: AdminItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: admin$category_pb.AdminCategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminItemService/AdminItemCategories',
      request,
      metadata || {},
      this.methodInfoAdminItemCategories,
      callback);
  }

  methodInfoAdminItemBindCategory = new grpcWeb.AbstractClientBase.MethodInfo(
    admin$category_pb.AdminCategoriesResponse,
    (request: AdminItemBindRequest) => {
      return request.serializeBinary();
    },
    admin$category_pb.AdminCategoriesResponse.deserializeBinary
  );

  adminItemBindCategory(
    request: AdminItemBindRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: admin$category_pb.AdminCategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminItemService/AdminItemBindCategory',
      request,
      metadata || {},
      this.methodInfoAdminItemBindCategory,
      callback);
  }

  methodInfoAdminItemUnbindCategory = new grpcWeb.AbstractClientBase.MethodInfo(
    admin$category_pb.AdminCategoriesResponse,
    (request: AdminItemBindRequest) => {
      return request.serializeBinary();
    },
    admin$category_pb.AdminCategoriesResponse.deserializeBinary
  );

  adminItemUnbindCategory(
    request: AdminItemBindRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: admin$category_pb.AdminCategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminItemService/AdminItemUnbindCategory',
      request,
      metadata || {},
      this.methodInfoAdminItemUnbindCategory,
      callback);
  }

  methodInfoAdminItemProperties = new grpcWeb.AbstractClientBase.MethodInfo(
    admin$property_pb.AdminPropertiesResponse,
    (request: AdminItemRequest) => {
      return request.serializeBinary();
    },
    admin$property_pb.AdminPropertiesResponse.deserializeBinary
  );

  adminItemProperties(
    request: AdminItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: admin$property_pb.AdminPropertiesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminItemService/AdminItemProperties',
      request,
      metadata || {},
      this.methodInfoAdminItemProperties,
      callback);
  }

  methodInfoAdminItemOffers = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminOffersResponse,
    (request: AdminOffersRequest) => {
      return request.serializeBinary();
    },
    AdminOffersResponse.deserializeBinary
  );

  adminItemOffers(
    request: AdminOffersRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminOffersResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminItemService/AdminItemOffers',
      request,
      metadata || {},
      this.methodInfoAdminItemOffers,
      callback);
  }

  methodInfoAdminUploadOffer = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminItemResponse,
    (request: AdminUploadOfferRequest) => {
      return request.serializeBinary();
    },
    AdminItemResponse.deserializeBinary
  );

  adminUploadOffer(
    request: AdminUploadOfferRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminItemResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminItemService/AdminUploadOffer',
      request,
      metadata || {},
      this.methodInfoAdminUploadOffer,
      callback);
  }

  methodInfoAdminRozetkaCategories = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminRozetkaCategoriesResponse,
    (request: AdminRozetkaCategoriesRequest) => {
      return request.serializeBinary();
    },
    AdminRozetkaCategoriesResponse.deserializeBinary
  );

  adminRozetkaCategories(
    request: AdminRozetkaCategoriesRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminRozetkaCategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminItemService/AdminRozetkaCategories',
      request,
      metadata || {},
      this.methodInfoAdminRozetkaCategories,
      callback);
  }

  methodInfoAdminRozetkaBindCategory = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminRozetkaCategoryBindResponse,
    (request: AdminRozetkaCategoryBindRequest) => {
      return request.serializeBinary();
    },
    AdminRozetkaCategoryBindResponse.deserializeBinary
  );

  adminRozetkaBindCategory(
    request: AdminRozetkaCategoryBindRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminRozetkaCategoryBindResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminItemService/AdminRozetkaBindCategory',
      request,
      metadata || {},
      this.methodInfoAdminRozetkaBindCategory,
      callback);
  }

  methodInfoAdminRozetkaProperties = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminRozetkaPropertiesResponse,
    (request: AdminRozetkaPropertiesRequest) => {
      return request.serializeBinary();
    },
    AdminRozetkaPropertiesResponse.deserializeBinary
  );

  adminRozetkaProperties(
    request: AdminRozetkaPropertiesRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminRozetkaPropertiesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminItemService/AdminRozetkaProperties',
      request,
      metadata || {},
      this.methodInfoAdminRozetkaProperties,
      callback);
  }

}

