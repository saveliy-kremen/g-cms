import * as jspb from "google-protobuf"

export class Vendor extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  getCountry(): string;
  setCountry(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Vendor.AsObject;
  static toObject(includeInstance: boolean, msg: Vendor): Vendor.AsObject;
  static serializeBinaryToWriter(message: Vendor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Vendor;
  static deserializeBinaryFromReader(message: Vendor, reader: jspb.BinaryReader): Vendor;
}

export namespace Vendor {
  export type AsObject = {
    id: number,
    name: string,
    country: string,
  }
}

export class VendorRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VendorRequest.AsObject;
  static toObject(includeInstance: boolean, msg: VendorRequest): VendorRequest.AsObject;
  static serializeBinaryToWriter(message: VendorRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VendorRequest;
  static deserializeBinaryFromReader(message: VendorRequest, reader: jspb.BinaryReader): VendorRequest;
}

export namespace VendorRequest {
  export type AsObject = {
    id: number,
  }
}

export class VendorsRequest extends jspb.Message {
  getPage(): number;
  setPage(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getSort(): string;
  setSort(value: string): void;

  getDirection(): string;
  setDirection(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VendorsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: VendorsRequest): VendorsRequest.AsObject;
  static serializeBinaryToWriter(message: VendorsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VendorsRequest;
  static deserializeBinaryFromReader(message: VendorsRequest, reader: jspb.BinaryReader): VendorsRequest;
}

export namespace VendorsRequest {
  export type AsObject = {
    page: number,
    pageSize: number,
    sort: string,
    direction: string,
  }
}

export class VendorResponse extends jspb.Message {
  getVendor(): Vendor | undefined;
  setVendor(value?: Vendor): void;
  hasVendor(): boolean;
  clearVendor(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VendorResponse.AsObject;
  static toObject(includeInstance: boolean, msg: VendorResponse): VendorResponse.AsObject;
  static serializeBinaryToWriter(message: VendorResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VendorResponse;
  static deserializeBinaryFromReader(message: VendorResponse, reader: jspb.BinaryReader): VendorResponse;
}

export namespace VendorResponse {
  export type AsObject = {
    vendor?: Vendor.AsObject,
  }
}

export class VendorsResponse extends jspb.Message {
  getVendorsList(): Array<Vendor>;
  setVendorsList(value: Array<Vendor>): void;
  clearVendorsList(): void;
  addVendors(value?: Vendor, index?: number): Vendor;

  getTotal(): number;
  setTotal(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VendorsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: VendorsResponse): VendorsResponse.AsObject;
  static serializeBinaryToWriter(message: VendorsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VendorsResponse;
  static deserializeBinaryFromReader(message: VendorsResponse, reader: jspb.BinaryReader): VendorsResponse;
}

export namespace VendorsResponse {
  export type AsObject = {
    vendorsList: Array<Vendor.AsObject>,
    total: number,
  }
}

