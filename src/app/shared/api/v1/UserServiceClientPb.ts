/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

import {
  AdminDeleteUserRequest,
  AdminEditUserRequest,
  AdminUserRequest,
  AdminUserResponse,
  AdminUsersRequest,
  AdminUsersResponse,
  AuthRequest,
  ChangePasswordRequest,
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
    UserResponse,
    (request: AuthRequest) => {
      return request.serializeBinary();
    },
    UserResponse.deserializeBinary
  );

  auth(
    request: AuthRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: UserResponse) => void) {
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
    UserResponse,
    (request: RegisterRequest) => {
      return request.serializeBinary();
    },
    UserResponse.deserializeBinary
  );

  register(
    request: RegisterRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: UserResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.UserService/Register',
      request,
      metadata || {},
      this.methodInfoRegister,
      callback);
  }

  methodInfoChangePassword = new grpcWeb.AbstractClientBase.MethodInfo(
    UserResponse,
    (request: ChangePasswordRequest) => {
      return request.serializeBinary();
    },
    UserResponse.deserializeBinary
  );

  changePassword(
    request: ChangePasswordRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: UserResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.UserService/ChangePassword',
      request,
      metadata || {},
      this.methodInfoChangePassword,
      callback);
  }

  methodInfoAdminUsers = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminUsersResponse,
    (request: AdminUsersRequest) => {
      return request.serializeBinary();
    },
    AdminUsersResponse.deserializeBinary
  );

  adminUsers(
    request: AdminUsersRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminUsersResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.UserService/AdminUsers',
      request,
      metadata || {},
      this.methodInfoAdminUsers,
      callback);
  }

  methodInfoAdminUser = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminUserResponse,
    (request: AdminUserRequest) => {
      return request.serializeBinary();
    },
    AdminUserResponse.deserializeBinary
  );

  adminUser(
    request: AdminUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminUserResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.UserService/AdminUser',
      request,
      metadata || {},
      this.methodInfoAdminUser,
      callback);
  }

  methodInfoAdminEditUser = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminUserResponse,
    (request: AdminEditUserRequest) => {
      return request.serializeBinary();
    },
    AdminUserResponse.deserializeBinary
  );

  adminEditUser(
    request: AdminEditUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminUserResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.UserService/AdminEditUser',
      request,
      metadata || {},
      this.methodInfoAdminEditUser,
      callback);
  }

  methodInfoAdminDeleteUser = new grpcWeb.AbstractClientBase.MethodInfo(
    AdminUsersResponse,
    (request: AdminDeleteUserRequest) => {
      return request.serializeBinary();
    },
    AdminUsersResponse.deserializeBinary
  );

  adminDeleteUser(
    request: AdminDeleteUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AdminUsersResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.UserService/AdminDeleteUser',
      request,
      metadata || {},
      this.methodInfoAdminDeleteUser,
      callback);
  }

}

