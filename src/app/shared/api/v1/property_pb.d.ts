import * as jspb from "google-protobuf"

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as category_pb from './category_pb';

export class Property extends jspb.Message {
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

  getValuesList(): Array<PropertyValue>;
  setValuesList(value: Array<PropertyValue>): void;
  clearValuesList(): void;
  addValues(value?: PropertyValue, index?: number): PropertyValue;

  getItemValuesList(): Array<number>;
  setItemValuesList(value: Array<number>): void;
  clearItemValuesList(): void;
  addItemValues(value: number, index?: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Property.AsObject;
  static toObject(includeInstance: boolean, msg: Property): Property.AsObject;
  static serializeBinaryToWriter(message: Property, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Property;
  static deserializeBinaryFromReader(message: Property, reader: jspb.BinaryReader): Property;
}

export namespace Property {
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
    valuesList: Array<PropertyValue.AsObject>,
    itemValuesList: Array<number>,
  }
}

export class PropertyValue extends jspb.Message {
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
  toObject(includeInstance?: boolean): PropertyValue.AsObject;
  static toObject(includeInstance: boolean, msg: PropertyValue): PropertyValue.AsObject;
  static serializeBinaryToWriter(message: PropertyValue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PropertyValue;
  static deserializeBinaryFromReader(message: PropertyValue, reader: jspb.BinaryReader): PropertyValue;
}

export namespace PropertyValue {
  export type AsObject = {
    id: number,
    userId: number,
    propertyId: number,
    value: string,
    image: string,
    sort: number,
  }
}

export class PropertyRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PropertyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PropertyRequest): PropertyRequest.AsObject;
  static serializeBinaryToWriter(message: PropertyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PropertyRequest;
  static deserializeBinaryFromReader(message: PropertyRequest, reader: jspb.BinaryReader): PropertyRequest;
}

export namespace PropertyRequest {
  export type AsObject = {
    id: number,
  }
}

export class PropertyValueRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PropertyValueRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PropertyValueRequest): PropertyValueRequest.AsObject;
  static serializeBinaryToWriter(message: PropertyValueRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PropertyValueRequest;
  static deserializeBinaryFromReader(message: PropertyValueRequest, reader: jspb.BinaryReader): PropertyValueRequest;
}

export namespace PropertyValueRequest {
  export type AsObject = {
    id: number,
  }
}

export class PropertyBindRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getCategoryId(): string;
  setCategoryId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PropertyBindRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PropertyBindRequest): PropertyBindRequest.AsObject;
  static serializeBinaryToWriter(message: PropertyBindRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PropertyBindRequest;
  static deserializeBinaryFromReader(message: PropertyBindRequest, reader: jspb.BinaryReader): PropertyBindRequest;
}

export namespace PropertyBindRequest {
  export type AsObject = {
    id: number,
    categoryId: string,
  }
}

export class PropertiesRequest extends jspb.Message {
  getPage(): number;
  setPage(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getSort(): string;
  setSort(value: string): void;

  getDirection(): string;
  setDirection(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PropertiesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PropertiesRequest): PropertiesRequest.AsObject;
  static serializeBinaryToWriter(message: PropertiesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PropertiesRequest;
  static deserializeBinaryFromReader(message: PropertiesRequest, reader: jspb.BinaryReader): PropertiesRequest;
}

export namespace PropertiesRequest {
  export type AsObject = {
    page: number,
    pageSize: number,
    sort: string,
    direction: string,
  }
}

export class EditPropertyRequest extends jspb.Message {
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
  toObject(includeInstance?: boolean): EditPropertyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EditPropertyRequest): EditPropertyRequest.AsObject;
  static serializeBinaryToWriter(message: EditPropertyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EditPropertyRequest;
  static deserializeBinaryFromReader(message: EditPropertyRequest, reader: jspb.BinaryReader): EditPropertyRequest;
}

export namespace EditPropertyRequest {
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

export class DeletePropertyRequest extends jspb.Message {
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
  toObject(includeInstance?: boolean): DeletePropertyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeletePropertyRequest): DeletePropertyRequest.AsObject;
  static serializeBinaryToWriter(message: DeletePropertyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeletePropertyRequest;
  static deserializeBinaryFromReader(message: DeletePropertyRequest, reader: jspb.BinaryReader): DeletePropertyRequest;
}

export namespace DeletePropertyRequest {
  export type AsObject = {
    id: number,
    page: number,
    pageSize: number,
    sort: string,
    direction: string,
  }
}

export class EditPropertyValueRequest extends jspb.Message {
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
  toObject(includeInstance?: boolean): EditPropertyValueRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EditPropertyValueRequest): EditPropertyValueRequest.AsObject;
  static serializeBinaryToWriter(message: EditPropertyValueRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EditPropertyValueRequest;
  static deserializeBinaryFromReader(message: EditPropertyValueRequest, reader: jspb.BinaryReader): EditPropertyValueRequest;
}

export namespace EditPropertyValueRequest {
  export type AsObject = {
    id: number,
    propertyId: number,
    value: string,
    sort: number,
    image: string,
  }
}

export class PropertyResponse extends jspb.Message {
  getProperty(): Property | undefined;
  setProperty(value?: Property): void;
  hasProperty(): boolean;
  clearProperty(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PropertyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PropertyResponse): PropertyResponse.AsObject;
  static serializeBinaryToWriter(message: PropertyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PropertyResponse;
  static deserializeBinaryFromReader(message: PropertyResponse, reader: jspb.BinaryReader): PropertyResponse;
}

export namespace PropertyResponse {
  export type AsObject = {
    property?: Property.AsObject,
  }
}

export class PropertiesResponse extends jspb.Message {
  getPropertiesList(): Array<Property>;
  setPropertiesList(value: Array<Property>): void;
  clearPropertiesList(): void;
  addProperties(value?: Property, index?: number): Property;

  getPosition(): number;
  setPosition(value: number): void;

  getTotal(): number;
  setTotal(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PropertiesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PropertiesResponse): PropertiesResponse.AsObject;
  static serializeBinaryToWriter(message: PropertiesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PropertiesResponse;
  static deserializeBinaryFromReader(message: PropertiesResponse, reader: jspb.BinaryReader): PropertiesResponse;
}

export namespace PropertiesResponse {
  export type AsObject = {
    propertiesList: Array<Property.AsObject>,
    position: number,
    total: number,
  }
}

export class PropertyValueResponse extends jspb.Message {
  getPropertyValue(): PropertyValue | undefined;
  setPropertyValue(value?: PropertyValue): void;
  hasPropertyValue(): boolean;
  clearPropertyValue(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PropertyValueResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PropertyValueResponse): PropertyValueResponse.AsObject;
  static serializeBinaryToWriter(message: PropertyValueResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PropertyValueResponse;
  static deserializeBinaryFromReader(message: PropertyValueResponse, reader: jspb.BinaryReader): PropertyValueResponse;
}

export namespace PropertyValueResponse {
  export type AsObject = {
    propertyValue?: PropertyValue.AsObject,
  }
}

