import * as jspb from "google-protobuf"

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

export class User extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getFullname(): string;
  setFullname(value: string): void;

  getPhone(): string;
  setPhone(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getPhoto(): string;
  setPhoto(value: string): void;

  getRole(): number;
  setRole(value: number): void;

  getTrademark(): string;
  setTrademark(value: string): void;

  getTariff(): number;
  setTariff(value: number): void;

  getAmount(): number;
  setAmount(value: number): void;

  getAbout(): string;
  setAbout(value: string): void;

  getActive(): boolean;
  setActive(value: boolean): void;

  getShopName(): string;
  setShopName(value: string): void;

  getShopUrl(): string;
  setShopUrl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id: number,
    fullname: string,
    phone: string,
    email: string,
    photo: string,
    role: number,
    trademark: string,
    tariff: number,
    amount: number,
    about: string,
    active: boolean,
    shopName: string,
    shopUrl: string,
  }
}

export class RegisterRequest extends jspb.Message {
  getFullname(): string;
  setFullname(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getPhone(): string;
  setPhone(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterRequest): RegisterRequest.AsObject;
  static serializeBinaryToWriter(message: RegisterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterRequest;
  static deserializeBinaryFromReader(message: RegisterRequest, reader: jspb.BinaryReader): RegisterRequest;
}

export namespace RegisterRequest {
  export type AsObject = {
    fullname: string,
    email: string,
    phone: string,
    password: string,
  }
}

export class AuthRequest extends jspb.Message {
  getLogin(): string;
  setLogin(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AuthRequest): AuthRequest.AsObject;
  static serializeBinaryToWriter(message: AuthRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthRequest;
  static deserializeBinaryFromReader(message: AuthRequest, reader: jspb.BinaryReader): AuthRequest;
}

export namespace AuthRequest {
  export type AsObject = {
    login: string,
    password: string,
  }
}

export class ChangePasswordRequest extends jspb.Message {
  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangePasswordRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChangePasswordRequest): ChangePasswordRequest.AsObject;
  static serializeBinaryToWriter(message: ChangePasswordRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangePasswordRequest;
  static deserializeBinaryFromReader(message: ChangePasswordRequest, reader: jspb.BinaryReader): ChangePasswordRequest;
}

export namespace ChangePasswordRequest {
  export type AsObject = {
    password: string,
  }
}

export class AdminUsersRequest extends jspb.Message {
  getPage(): number;
  setPage(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getSort(): string;
  setSort(value: string): void;

  getDirection(): string;
  setDirection(value: string): void;

  getSearch(): string;
  setSearch(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminUsersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminUsersRequest): AdminUsersRequest.AsObject;
  static serializeBinaryToWriter(message: AdminUsersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminUsersRequest;
  static deserializeBinaryFromReader(message: AdminUsersRequest, reader: jspb.BinaryReader): AdminUsersRequest;
}

export namespace AdminUsersRequest {
  export type AsObject = {
    page: number,
    pageSize: number,
    sort: string,
    direction: string,
    search: string,
  }
}

export class AdminUserRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminUserRequest): AdminUserRequest.AsObject;
  static serializeBinaryToWriter(message: AdminUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminUserRequest;
  static deserializeBinaryFromReader(message: AdminUserRequest, reader: jspb.BinaryReader): AdminUserRequest;
}

export namespace AdminUserRequest {
  export type AsObject = {
    id: number,
  }
}

export class AdminEditUserRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getFullname(): string;
  setFullname(value: string): void;

  getPhone(): string;
  setPhone(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  getRole(): number;
  setRole(value: number): void;

  getActive(): boolean;
  setActive(value: boolean): void;

  getShopName(): string;
  setShopName(value: string): void;

  getShopUrl(): string;
  setShopUrl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminEditUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminEditUserRequest): AdminEditUserRequest.AsObject;
  static serializeBinaryToWriter(message: AdminEditUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminEditUserRequest;
  static deserializeBinaryFromReader(message: AdminEditUserRequest, reader: jspb.BinaryReader): AdminEditUserRequest;
}

export namespace AdminEditUserRequest {
  export type AsObject = {
    id: number,
    fullname: string,
    phone: string,
    email: string,
    password: string,
    role: number,
    active: boolean,
    shopName: string,
    shopUrl: string,
  }
}

export class AdminDeleteUserRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getSort(): string;
  setSort(value: string): void;

  getDirection(): string;
  setDirection(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminDeleteUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminDeleteUserRequest): AdminDeleteUserRequest.AsObject;
  static serializeBinaryToWriter(message: AdminDeleteUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminDeleteUserRequest;
  static deserializeBinaryFromReader(message: AdminDeleteUserRequest, reader: jspb.BinaryReader): AdminDeleteUserRequest;
}

export namespace AdminDeleteUserRequest {
  export type AsObject = {
    id: number,
    page: number,
    pageSize: number,
    sort: string,
    direction: string,
  }
}

export class UserResponse extends jspb.Message {
  getUser(): User | undefined;
  setUser(value?: User): void;
  hasUser(): boolean;
  clearUser(): void;

  getToken(): string;
  setToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserResponse): UserResponse.AsObject;
  static serializeBinaryToWriter(message: UserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserResponse;
  static deserializeBinaryFromReader(message: UserResponse, reader: jspb.BinaryReader): UserResponse;
}

export namespace UserResponse {
  export type AsObject = {
    user?: User.AsObject,
    token: string,
  }
}

export class AdminUsersResponse extends jspb.Message {
  getUsersList(): Array<User>;
  setUsersList(value: Array<User>): void;
  clearUsersList(): void;
  addUsers(value?: User, index?: number): User;

  getTotal(): number;
  setTotal(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminUsersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AdminUsersResponse): AdminUsersResponse.AsObject;
  static serializeBinaryToWriter(message: AdminUsersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminUsersResponse;
  static deserializeBinaryFromReader(message: AdminUsersResponse, reader: jspb.BinaryReader): AdminUsersResponse;
}

export namespace AdminUsersResponse {
  export type AsObject = {
    usersList: Array<User.AsObject>,
    total: number,
  }
}

export class AdminUserResponse extends jspb.Message {
  getUser(): User | undefined;
  setUser(value?: User): void;
  hasUser(): boolean;
  clearUser(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AdminUserResponse): AdminUserResponse.AsObject;
  static serializeBinaryToWriter(message: AdminUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminUserResponse;
  static deserializeBinaryFromReader(message: AdminUserResponse, reader: jspb.BinaryReader): AdminUserResponse;
}

export namespace AdminUserResponse {
  export type AsObject = {
    user?: User.AsObject,
  }
}

