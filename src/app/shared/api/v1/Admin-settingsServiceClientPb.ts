/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

import {
  AdminEditSettingsRequest,
  AdminSettingsResponse} from './admin-settings_pb';

export class AdminSettingsServiceClient {
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

  methodInfoAdminSettings = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminSettingsResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    AdminSettingsResponse.deserializeBinary
  );

  adminSettings(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminSettingsResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminSettingsService/AdminSettings',
      request,
      metadata || {},
      this.methodInfoAdminSettings,
      callback);
  }

  methodInfoAdminEditSettings = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminSettingsResponse,
    (request: AdminEditSettingsRequest) => {
      return request.serializeBinary();
    },
    AdminSettingsResponse.deserializeBinary
  );

  adminEditSettings(
    request: AdminEditSettingsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminSettingsResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.AdminSettingsService/AdminEditSettings',
      request,
      metadata || {},
      this.methodInfoAdminEditSettings,
      callback);
  }

}

