import * as jspb from "google-protobuf"

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as admin$category_pb from './admin-category_pb';

export class AdminProperty extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getUserId(): number;
  setUserId(value: number): void;

  getTitle(): string;
  setTitle(value: string): void;

  getCode(): string;
  setCode(value: string): void;

  getType(): number;
  setType(value: number): void;

  getDisplay(): number;
  setDisplay(value: number): void;

  getRequired(): boolean;
  setRequired(value: boolean): void;

  getMultiple(): boolean;
  setMultiple(value: boolean): void;

  getSort(): number;
  setSort(value: number): void;

  getValuesList(): Array<AdminPropertyValue>;
  setValuesList(value: Array<AdminPropertyValue>): void;
  clearValuesList(): void;
  addValues(value?: AdminPropertyValue, index?: number): AdminPropertyValue;

  getValuesJson(): string;
  setValuesJson(value: string): void;

  getItemValuesList(): Array<number>;
  setItemValuesList(value: Array<number>): void;
  clearItemValuesList(): void;
  addItemValues(value: number, index?: number): void;

  getItemValuesJson(): string;
  setItemValuesJson(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminProperty.AsObject;
  static toObject(includeInstance: boolean, msg: AdminProperty): AdminProperty.AsObject;
  static serializeBinaryToWriter(message: AdminProperty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminProperty;
  static deserializeBinaryFromReader(message: AdminProperty, reader: jspb.BinaryReader): AdminProperty;
}

export namespace AdminProperty {
  export type AsObject = {
    id: string,
    userId: number,
    title: string,
    code: string,
    type: number,
    display: number,
    required: boolean,
    multiple: boolean,
    sort: number,
    valuesList: Array<AdminPropertyValue.AsObject>,
    valuesJson: string,
    itemValuesList: Array<number>,
    itemValuesJson: string,
  }
}

export class AdminPropertyValue extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getUserId(): number;
  setUserId(value: number): void;

  getPropertyId(): number;
  setPropertyId(value: number): void;

  getValue(): string;
  setValue(value: string): void;

  getImage(): string;
  setImage(value: string): void;

  getSort(): number;
  setSort(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminPropertyValue.AsObject;
  static toObject(includeInstance: boolean, msg: AdminPropertyValue): AdminPropertyValue.AsObject;
  static serializeBinaryToWriter(message: AdminPropertyValue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminPropertyValue;
  static deserializeBinaryFromReader(message: AdminPropertyValue, reader: jspb.BinaryReader): AdminPropertyValue;
}

export namespace AdminPropertyValue {
  export type AsObject = {
    id: number,
    userId: number,
    propertyId: number,
    value: string,
    image: string,
    sort: number,
  }
}

export class AdminPropertyRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminPropertyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminPropertyRequest): AdminPropertyRequest.AsObject;
  static serializeBinaryToWriter(message: AdminPropertyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminPropertyRequest;
  static deserializeBinaryFromReader(message: AdminPropertyRequest, reader: jspb.BinaryReader): AdminPropertyRequest;
}

export namespace AdminPropertyRequest {
  export type AsObject = {
    id: number,
  }
}

export class AdminPropertyValueRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminPropertyValueRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminPropertyValueRequest): AdminPropertyValueRequest.AsObject;
  static serializeBinaryToWriter(message: AdminPropertyValueRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminPropertyValueRequest;
  static deserializeBinaryFromReader(message: AdminPropertyValueRequest, reader: jspb.BinaryReader): AdminPropertyValueRequest;
}

export namespace AdminPropertyValueRequest {
  export type AsObject = {
    id: number,
  }
}

export class AdminPropertyBindRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getCategoryId(): string;
  setCategoryId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminPropertyBindRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminPropertyBindRequest): AdminPropertyBindRequest.AsObject;
  static serializeBinaryToWriter(message: AdminPropertyBindRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminPropertyBindRequest;
  static deserializeBinaryFromReader(message: AdminPropertyBindRequest, reader: jspb.BinaryReader): AdminPropertyBindRequest;
}

export namespace AdminPropertyBindRequest {
  export type AsObject = {
    id: number,
    categoryId: string,
  }
}

export class AdminPropertiesRequest extends jspb.Message {
  getPage(): number;
  setPage(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getSort(): string;
  setSort(value: string): void;

  getDirection(): string;
  setDirection(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminPropertiesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminPropertiesRequest): AdminPropertiesRequest.AsObject;
  static serializeBinaryToWriter(message: AdminPropertiesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminPropertiesRequest;
  static deserializeBinaryFromReader(message: AdminPropertiesRequest, reader: jspb.BinaryReader): AdminPropertiesRequest;
}

export namespace AdminPropertiesRequest {
  export type AsObject = {
    page: number,
    pageSize: number,
    sort: string,
    direction: string,
  }
}

export class AdminEditPropertyRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getTitle(): string;
  setTitle(value: string): void;

  getCode(): string;
  setCode(value: string): void;

  getType(): number;
  setType(value: number): void;

  getDisplay(): number;
  setDisplay(value: number): void;

  getRequired(): boolean;
  setRequired(value: boolean): void;

  getMultiple(): boolean;
  setMultiple(value: boolean): void;

  getSort(): number;
  setSort(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminEditPropertyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminEditPropertyRequest): AdminEditPropertyRequest.AsObject;
  static serializeBinaryToWriter(message: AdminEditPropertyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminEditPropertyRequest;
  static deserializeBinaryFromReader(message: AdminEditPropertyRequest, reader: jspb.BinaryReader): AdminEditPropertyRequest;
}

export namespace AdminEditPropertyRequest {
  export type AsObject = {
    id: number,
    title: string,
    code: string,
    type: number,
    display: number,
    required: boolean,
    multiple: boolean,
    sort: number,
  }
}

export class AdminDeletePropertyRequest extends jspb.Message {
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
  toObject(includeInstance?: boolean): AdminDeletePropertyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminDeletePropertyRequest): AdminDeletePropertyRequest.AsObject;
  static serializeBinaryToWriter(message: AdminDeletePropertyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminDeletePropertyRequest;
  static deserializeBinaryFromReader(message: AdminDeletePropertyRequest, reader: jspb.BinaryReader): AdminDeletePropertyRequest;
}

export namespace AdminDeletePropertyRequest {
  export type AsObject = {
    id: number,
    page: number,
    pageSize: number,
    sort: string,
    direction: string,
  }
}

export class AdminEditPropertyValueRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getPropertyId(): number;
  setPropertyId(value: number): void;

  getValue(): string;
  setValue(value: string): void;

  getSort(): number;
  setSort(value: number): void;

  getImage(): string;
  setImage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminEditPropertyValueRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminEditPropertyValueRequest): AdminEditPropertyValueRequest.AsObject;
  static serializeBinaryToWriter(message: AdminEditPropertyValueRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminEditPropertyValueRequest;
  static deserializeBinaryFromReader(message: AdminEditPropertyValueRequest, reader: jspb.BinaryReader): AdminEditPropertyValueRequest;
}

export namespace AdminEditPropertyValueRequest {
  export type AsObject = {
    id: number,
    propertyId: number,
    value: string,
    sort: number,
    image: string,
  }
}

export class AdminUploadPropertyRequest extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  getItemId(): number;
  setItemId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminUploadPropertyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminUploadPropertyRequest): AdminUploadPropertyRequest.AsObject;
  static serializeBinaryToWriter(message: AdminUploadPropertyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminUploadPropertyRequest;
  static deserializeBinaryFromReader(message: AdminUploadPropertyRequest, reader: jspb.BinaryReader): AdminUploadPropertyRequest;
}

export namespace AdminUploadPropertyRequest {
  export type AsObject = {
    title: string,
    value: string,
    itemId: number,
  }
}

export class AdminPropertyResponse extends jspb.Message {
  getProperty(): AdminProperty | undefined;
  setProperty(value?: AdminProperty): void;
  hasProperty(): boolean;
  clearProperty(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminPropertyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AdminPropertyResponse): AdminPropertyResponse.AsObject;
  static serializeBinaryToWriter(message: AdminPropertyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminPropertyResponse;
  static deserializeBinaryFromReader(message: AdminPropertyResponse, reader: jspb.BinaryReader): AdminPropertyResponse;
}

export namespace AdminPropertyResponse {
  export type AsObject = {
    property?: AdminProperty.AsObject,
  }
}

export class AdminPropertiesResponse extends jspb.Message {
  getPropertiesList(): Array<AdminProperty>;
  setPropertiesList(value: Array<AdminProperty>): void;
  clearPropertiesList(): void;
  addProperties(value?: AdminProperty, index?: number): AdminProperty;

  getPosition(): number;
  setPosition(value: number): void;

  getTotal(): number;
  setTotal(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminPropertiesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AdminPropertiesResponse): AdminPropertiesResponse.AsObject;
  static serializeBinaryToWriter(message: AdminPropertiesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminPropertiesResponse;
  static deserializeBinaryFromReader(message: AdminPropertiesResponse, reader: jspb.BinaryReader): AdminPropertiesResponse;
}

export namespace AdminPropertiesResponse {
  export type AsObject = {
    propertiesList: Array<AdminProperty.AsObject>,
    position: number,
    total: number,
  }
}

export class AdminPropertyValueResponse extends jspb.Message {
  getPropertyValue(): AdminPropertyValue | undefined;
  setPropertyValue(value?: AdminPropertyValue): void;
  hasPropertyValue(): boolean;
  clearPropertyValue(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminPropertyValueResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AdminPropertyValueResponse): AdminPropertyValueResponse.AsObject;
  static serializeBinaryToWriter(message: AdminPropertyValueResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminPropertyValueResponse;
  static deserializeBinaryFromReader(message: AdminPropertyValueResponse, reader: jspb.BinaryReader): AdminPropertyValueResponse;
}

export namespace AdminPropertyValueResponse {
  export type AsObject = {
    propertyValue?: AdminPropertyValue.AsObject,
  }
}

