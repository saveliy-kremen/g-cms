import * as jspb from "google-protobuf"

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

export class Property extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getUserid(): number;
  setUserid(value: number): void;

  getTitle(): string;
  setTitle(value: string): void;

  getCode(): string;
  setCode(value: string): void;

  getType(): number;
  setType(value: number): void;

  getDisplay(): number;
  setDisplay(value: number): void;

  getPlural(): boolean;
  setPlural(value: boolean): void;

  getSort(): number;
  setSort(value: number): void;

  getValuesList(): Array<PropertyValue>;
  setValuesList(value: Array<PropertyValue>): void;
  clearValuesList(): void;
  addValues(value?: PropertyValue, index?: number): PropertyValue;

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
    userid: number,
    title: string,
    code: string,
    type: number,
    display: number,
    plural: boolean,
    sort: number,
    valuesList: Array<PropertyValue.AsObject>,
  }
}

export class PropertyValue extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getPropertyid(): number;
  setPropertyid(value: number): void;

  getValue(): string;
  setValue(value: string): void;

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
    id: string,
    propertyid: number,
    value: string,
    sort: number,
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

  getPlural(): boolean;
  setPlural(value: boolean): void;

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
    plural: boolean,
    sort: number,
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
  }
}

