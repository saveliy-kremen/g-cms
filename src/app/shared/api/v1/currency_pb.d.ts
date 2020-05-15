import * as jspb from "google-protobuf"

export class Currency extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  getShortName(): string;
  setShortName(value: string): void;

  getCode(): string;
  setCode(value: string): void;

  getRate(): number;
  setRate(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Currency.AsObject;
  static toObject(includeInstance: boolean, msg: Currency): Currency.AsObject;
  static serializeBinaryToWriter(message: Currency, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Currency;
  static deserializeBinaryFromReader(message: Currency, reader: jspb.BinaryReader): Currency;
}

export namespace Currency {
  export type AsObject = {
    id: number,
    name: string,
    shortName: string,
    code: string,
    rate: number,
  }
}

export class CurrencyRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CurrencyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CurrencyRequest): CurrencyRequest.AsObject;
  static serializeBinaryToWriter(message: CurrencyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CurrencyRequest;
  static deserializeBinaryFromReader(message: CurrencyRequest, reader: jspb.BinaryReader): CurrencyRequest;
}

export namespace CurrencyRequest {
  export type AsObject = {
    id: number,
  }
}

export class CurrenciesRequest extends jspb.Message {
  getPage(): number;
  setPage(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getSort(): string;
  setSort(value: string): void;

  getDirection(): string;
  setDirection(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CurrenciesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CurrenciesRequest): CurrenciesRequest.AsObject;
  static serializeBinaryToWriter(message: CurrenciesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CurrenciesRequest;
  static deserializeBinaryFromReader(message: CurrenciesRequest, reader: jspb.BinaryReader): CurrenciesRequest;
}

export namespace CurrenciesRequest {
  export type AsObject = {
    page: number,
    pageSize: number,
    sort: string,
    direction: string,
  }
}

export class CurrencyResponse extends jspb.Message {
  getCurrency(): Currency | undefined;
  setCurrency(value?: Currency): void;
  hasCurrency(): boolean;
  clearCurrency(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CurrencyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CurrencyResponse): CurrencyResponse.AsObject;
  static serializeBinaryToWriter(message: CurrencyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CurrencyResponse;
  static deserializeBinaryFromReader(message: CurrencyResponse, reader: jspb.BinaryReader): CurrencyResponse;
}

export namespace CurrencyResponse {
  export type AsObject = {
    currency?: Currency.AsObject,
  }
}

export class CurrenciesResponse extends jspb.Message {
  getCurrenciesList(): Array<Currency>;
  setCurrenciesList(value: Array<Currency>): void;
  clearCurrenciesList(): void;
  addCurrencies(value?: Currency, index?: number): Currency;

  getTotal(): number;
  setTotal(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CurrenciesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CurrenciesResponse): CurrenciesResponse.AsObject;
  static serializeBinaryToWriter(message: CurrenciesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CurrenciesResponse;
  static deserializeBinaryFromReader(message: CurrenciesResponse, reader: jspb.BinaryReader): CurrenciesResponse;
}

export namespace CurrenciesResponse {
  export type AsObject = {
    currenciesList: Array<Currency.AsObject>,
    total: number,
  }
}

