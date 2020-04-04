import * as jspb from "google-protobuf"

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

export class State extends jspb.Message {
  getDisabled(): boolean;
  setDisabled(value: boolean): void;

  getOpened(): boolean;
  setOpened(value: boolean): void;

  getSelected(): boolean;
  setSelected(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): State.AsObject;
  static toObject(includeInstance: boolean, msg: State): State.AsObject;
  static serializeBinaryToWriter(message: State, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): State;
  static deserializeBinaryFromReader(message: State, reader: jspb.BinaryReader): State;
}

export namespace State {
  export type AsObject = {
    disabled: boolean,
    opened: boolean,
    selected: boolean,
  }
}

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

  getState(): State | undefined;
  setState(value?: State): void;
  hasState(): boolean;
  clearState(): void;

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
    state?: State.AsObject,
    seoTitle: string,
    seoDescription: string,
    seoKeywords: string,
  }
}

export class AddCategoryRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getParent(): string;
  setParent(value: string): void;

  getText(): string;
  setText(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddCategoryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddCategoryRequest): AddCategoryRequest.AsObject;
  static serializeBinaryToWriter(message: AddCategoryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddCategoryRequest;
  static deserializeBinaryFromReader(message: AddCategoryRequest, reader: jspb.BinaryReader): AddCategoryRequest;
}

export namespace AddCategoryRequest {
  export type AsObject = {
    id: string,
    parent: string,
    text: string,
  }
}

export class DeleteCategoryRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteCategoryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteCategoryRequest): DeleteCategoryRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteCategoryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteCategoryRequest;
  static deserializeBinaryFromReader(message: DeleteCategoryRequest, reader: jspb.BinaryReader): DeleteCategoryRequest;
}

export namespace DeleteCategoryRequest {
  export type AsObject = {
    id: string,
  }
}

export class MoveCategoryRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getParent(): string;
  setParent(value: string): void;

  getPosition(): number;
  setPosition(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MoveCategoryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MoveCategoryRequest): MoveCategoryRequest.AsObject;
  static serializeBinaryToWriter(message: MoveCategoryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MoveCategoryRequest;
  static deserializeBinaryFromReader(message: MoveCategoryRequest, reader: jspb.BinaryReader): MoveCategoryRequest;
}

export namespace MoveCategoryRequest {
  export type AsObject = {
    id: string,
    parent: string,
    position: number,
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

export class EditCategoryRequest extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): void;

  getOldAlias(): string;
  setOldAlias(value: string): void;

  getAlias(): string;
  setAlias(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getImage(): string;
  setImage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EditCategoryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EditCategoryRequest): EditCategoryRequest.AsObject;
  static serializeBinaryToWriter(message: EditCategoryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EditCategoryRequest;
  static deserializeBinaryFromReader(message: EditCategoryRequest, reader: jspb.BinaryReader): EditCategoryRequest;
}

export namespace EditCategoryRequest {
  export type AsObject = {
    title: string,
    oldAlias: string,
    alias: string,
    description: string,
    image: string,
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

