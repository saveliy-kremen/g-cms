import * as jspb from "google-protobuf"

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

export class Category extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getUserId(): number;
  setUserId(value: number): void;

  getText(): string;
  setText(value: string): void;

  getAlias(): string;
  setAlias(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getImage(): string;
  setImage(value: string): void;

  getParent(): string;
  setParent(value: string): void;

  getSort(): number;
  setSort(value: number): void;

  getSeoTitle(): string;
  setSeoTitle(value: string): void;

  getSeoDescription(): string;
  setSeoDescription(value: string): void;

  getSeoKeywords(): string;
  setSeoKeywords(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Category.AsObject;
  static toObject(includeInstance: boolean, msg: Category): Category.AsObject;
  static serializeBinaryToWriter(message: Category, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Category;
  static deserializeBinaryFromReader(message: Category, reader: jspb.BinaryReader): Category;
}

export namespace Category {
  export type AsObject = {
    id: string,
    userId: number,
    text: string,
    alias: string,
    description: string,
    image: string,
    parent: string,
    sort: number,
    seoTitle: string,
    seoDescription: string,
    seoKeywords: string,
  }
}

export class CategoryRequest extends jspb.Message {
  getAlias(): string;
  setAlias(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CategoryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CategoryRequest): CategoryRequest.AsObject;
  static serializeBinaryToWriter(message: CategoryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CategoryRequest;
  static deserializeBinaryFromReader(message: CategoryRequest, reader: jspb.BinaryReader): CategoryRequest;
}

export namespace CategoryRequest {
  export type AsObject = {
    alias: string,
  }
}

export class CategoryResponse extends jspb.Message {
  getCategory(): Category | undefined;
  setCategory(value?: Category): void;
  hasCategory(): boolean;
  clearCategory(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CategoryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CategoryResponse): CategoryResponse.AsObject;
  static serializeBinaryToWriter(message: CategoryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CategoryResponse;
  static deserializeBinaryFromReader(message: CategoryResponse, reader: jspb.BinaryReader): CategoryResponse;
}

export namespace CategoryResponse {
  export type AsObject = {
    category?: Category.AsObject,
  }
}

export class CategoriesResponse extends jspb.Message {
  getCategoriesList(): Array<Category>;
  setCategoriesList(value: Array<Category>): void;
  clearCategoriesList(): void;
  addCategories(value?: Category, index?: number): Category;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CategoriesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CategoriesResponse): CategoriesResponse.AsObject;
  static serializeBinaryToWriter(message: CategoriesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CategoriesResponse;
  static deserializeBinaryFromReader(message: CategoriesResponse, reader: jspb.BinaryReader): CategoriesResponse;
}

export namespace CategoriesResponse {
  export type AsObject = {
    categoriesList: Array<Category.AsObject>,
  }
}

