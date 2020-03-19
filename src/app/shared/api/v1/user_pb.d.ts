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

