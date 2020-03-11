/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

import {
  AuthRequest,
  AuthResponse,
  RegisterRequest,
  UserResponse} from './user_pb';

export class UserServiceClient {
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

  methodInfoAuth = new grpcWeb.AbstractClientBase.MethodInfo(
    AuthResponse,
    (request: AuthRequest) => {
      return request.serializeBinary();
    },
    AuthResponse.deserializeBinary
  );

  auth(
    request: AuthRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AuthResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.UserService/Auth',
      request,
      metadata || {},
      this.methodInfoAuth,
      callback);
  }

  methodInfoMe = new grpcWeb.AbstractClientBase.MethodInfo(
    UserResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    UserResponse.deserializeBinary
  );

  me(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: UserResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.UserService/Me',
      request,
      metadata || {},
      this.methodInfoMe,
      callback);
  }

  methodInfoRegister = new grpcWeb.AbstractClientBase.MethodInfo(
    AuthResponse,
    (request: RegisterRequest) => {
      return request.serializeBinary();
    },
    AuthResponse.deserializeBinary
  );

  register(
    request: RegisterRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AuthResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.UserService/Register',
      request,
      metadata || {},
      this.methodInfoRegister,
      callback);
  }

}

