/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as category_pb from './category_pb';
import * as property_pb from './property_pb';

import {
  DeleteItemRequest,
  DeleteOfferRequest,
  DraftRequest,
  EditItemRequest,
  ItemBindRequest,
  ItemImagesResponse,
  ItemRequest,
  ItemResponse,
  ItemsRequest,
  ItemsResponse,
  OffersRequest,
  OffersResponse,
  UploadOfferRequest} from './item_pb';

export class ItemServiceClient {
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

  methodInfoItem = new grpcWeb.AbstractClientBase.MethodInfo(
    ItemResponse,
    (request: ItemRequest) => {
      return request.serializeBinary();
    },
    ItemResponse.deserializeBinary
  );

  item(
    request: ItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ItemResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ItemService/Item',
      request,
      metadata || {},
      this.methodInfoItem,
      callback);
  }

  methodInfoCreateDraftItem = new grpcWeb.AbstractClientBase.MethodInfo(
    ItemResponse,
    (request: DraftRequest) => {
      return request.serializeBinary();
    },
    ItemResponse.deserializeBinary
  );

  createDraftItem(
    request: DraftRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ItemResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ItemService/CreateDraftItem',
      request,
      metadata || {},
      this.methodInfoCreateDraftItem,
      callback);
  }

  methodInfoEditItem = new grpcWeb.AbstractClientBase.MethodInfo(
    ItemResponse,
    (request: EditItemRequest) => {
      return request.serializeBinary();
    },
    ItemResponse.deserializeBinary
  );

  editItem(
    request: EditItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ItemResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ItemService/EditItem',
      request,
      metadata || {},
      this.methodInfoEditItem,
      callback);
  }

  methodInfoDeleteItem = new grpcWeb.AbstractClientBase.MethodInfo(
    ItemsResponse,
    (request: DeleteItemRequest) => {
      return request.serializeBinary();
    },
    ItemsResponse.deserializeBinary
  );

  deleteItem(
    request: DeleteItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ItemsResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ItemService/DeleteItem',
      request,
      metadata || {},
      this.methodInfoDeleteItem,
      callback);
  }

  methodInfoDeleteOffer = new grpcWeb.AbstractClientBase.MethodInfo(
    OffersResponse,
    (request: DeleteOfferRequest) => {
      return request.serializeBinary();
    },
    OffersResponse.deserializeBinary
  );

  deleteOffer(
    request: DeleteOfferRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: OffersResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ItemService/DeleteOffer',
      request,
      metadata || {},
      this.methodInfoDeleteOffer,
      callback);
  }

  methodInfoItems = new grpcWeb.AbstractClientBase.MethodInfo(
    ItemsResponse,
    (request: ItemsRequest) => {
      return request.serializeBinary();
    },
    ItemsResponse.deserializeBinary
  );

  items(
    request: ItemsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ItemsResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ItemService/Items',
      request,
      metadata || {},
      this.methodInfoItems,
      callback);
  }

  methodInfoGetUploadImages = new grpcWeb.AbstractClientBase.MethodInfo(
    ItemImagesResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    ItemImagesResponse.deserializeBinary
  );

  getUploadImages(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ItemImagesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ItemService/GetUploadImages',
      request,
      metadata || {},
      this.methodInfoGetUploadImages,
      callback);
  }

  methodInfoItemCategories = new grpcWeb.AbstractClientBase.MethodInfo(
    category_pb.CategoriesResponse,
    (request: ItemRequest) => {
      return request.serializeBinary();
    },
    category_pb.CategoriesResponse.deserializeBinary
  );

  itemCategories(
    request: ItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: category_pb.CategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ItemService/ItemCategories',
      request,
      metadata || {},
      this.methodInfoItemCategories,
      callback);
  }

  methodInfoItemBindCategory = new grpcWeb.AbstractClientBase.MethodInfo(
    category_pb.CategoriesResponse,
    (request: ItemBindRequest) => {
      return request.serializeBinary();
    },
    category_pb.CategoriesResponse.deserializeBinary
  );

  itemBindCategory(
    request: ItemBindRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: category_pb.CategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ItemService/ItemBindCategory',
      request,
      metadata || {},
      this.methodInfoItemBindCategory,
      callback);
  }

  methodInfoItemUnbindCategory = new grpcWeb.AbstractClientBase.MethodInfo(
    category_pb.CategoriesResponse,
    (request: ItemBindRequest) => {
      return request.serializeBinary();
    },
    category_pb.CategoriesResponse.deserializeBinary
  );

  itemUnbindCategory(
    request: ItemBindRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: category_pb.CategoriesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ItemService/ItemUnbindCategory',
      request,
      metadata || {},
      this.methodInfoItemUnbindCategory,
      callback);
  }

  methodInfoItemProperties = new grpcWeb.AbstractClientBase.MethodInfo(
    property_pb.PropertiesResponse,
    (request: ItemRequest) => {
      return request.serializeBinary();
    },
    property_pb.PropertiesResponse.deserializeBinary
  );

  itemProperties(
    request: ItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: property_pb.PropertiesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ItemService/ItemProperties',
      request,
      metadata || {},
      this.methodInfoItemProperties,
      callback);
  }

  methodInfoItemOffers = new grpcWeb.AbstractClientBase.MethodInfo(
    OffersResponse,
    (request: OffersRequest) => {
      return request.serializeBinary();
    },
    OffersResponse.deserializeBinary
  );

  itemOffers(
    request: OffersRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: OffersResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ItemService/ItemOffers',
      request,
      metadata || {},
      this.methodInfoItemOffers,
      callback);
  }

  methodInfoUploadOffer = new grpcWeb.AbstractClientBase.MethodInfo(
    ItemResponse,
    (request: UploadOfferRequest) => {
      return request.serializeBinary();
    },
    ItemResponse.deserializeBinary
  );

  uploadOffer(
    request: UploadOfferRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ItemResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ItemService/UploadOffer',
      request,
      metadata || {},
      this.methodInfoUploadOffer,
      callback);
  }

}

