import * as jspb from "google-protobuf"

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

export class AdminCategoryState extends jspb.Message {
  getDisabled(): boolean;
  setDisabled(value: boolean): void;

  getOpened(): boolean;
  setOpened(value: boolean): void;

  getSelected(): boolean;
  setSelected(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminCategoryState.AsObject;
  static toObject(includeInstance: boolean, msg: AdminCategoryState): AdminCategoryState.AsObject;
  static serializeBinaryToWriter(message: AdminCategoryState, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminCategoryState;
  static deserializeBinaryFromReader(message: AdminCategoryState, reader: jspb.BinaryReader): AdminCategoryState;
}

export namespace AdminCategoryState {
  export type AsObject = {
    disabled: boolean,
    opened: boolean,
    selected: boolean,
  }
}

export class AdminCategory extends jspb.Message {
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

  getState(): AdminCategoryState | undefined;
  setState(value?: AdminCategoryState): void;
  hasState(): boolean;
  clearState(): void;

  getSeoTitle(): string;
  setSeoTitle(value: string): void;

  getSeoDescription(): string;
  setSeoDescription(value: string): void;

  getSeoKeywords(): string;
  setSeoKeywords(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminCategory.AsObject;
  static toObject(includeInstance: boolean, msg: AdminCategory): AdminCategory.AsObject;
  static serializeBinaryToWriter(message: AdminCategory, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminCategory;
  static deserializeBinaryFromReader(message: AdminCategory, reader: jspb.BinaryReader): AdminCategory;
}

export namespace AdminCategory {
  export type AsObject = {
    id: string,
    userId: number,
    text: string,
    alias: string,
    description: string,
    image: string,
    parent: string,
    sort: number,
    state?: AdminCategoryState.AsObject,
    seoTitle: string,
    seoDescription: string,
    seoKeywords: string,
  }
}

export class AdminAddCategoryRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getParent(): string;
  setParent(value: string): void;

  getText(): string;
  setText(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminAddCategoryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminAddCategoryRequest): AdminAddCategoryRequest.AsObject;
  static serializeBinaryToWriter(message: AdminAddCategoryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminAddCategoryRequest;
  static deserializeBinaryFromReader(message: AdminAddCategoryRequest, reader: jspb.BinaryReader): AdminAddCategoryRequest;
}

export namespace AdminAddCategoryRequest {
  export type AsObject = {
    id: string,
    parent: string,
    text: string,
  }
}

export class AdminDeleteCategoryRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminDeleteCategoryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminDeleteCategoryRequest): AdminDeleteCategoryRequest.AsObject;
  static serializeBinaryToWriter(message: AdminDeleteCategoryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminDeleteCategoryRequest;
  static deserializeBinaryFromReader(message: AdminDeleteCategoryRequest, reader: jspb.BinaryReader): AdminDeleteCategoryRequest;
}

export namespace AdminDeleteCategoryRequest {
  export type AsObject = {
    id: string,
  }
}

export class AdminMoveCategoryRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getParent(): string;
  setParent(value: string): void;

  getPosition(): number;
  setPosition(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminMoveCategoryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminMoveCategoryRequest): AdminMoveCategoryRequest.AsObject;
  static serializeBinaryToWriter(message: AdminMoveCategoryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminMoveCategoryRequest;
  static deserializeBinaryFromReader(message: AdminMoveCategoryRequest, reader: jspb.BinaryReader): AdminMoveCategoryRequest;
}

export namespace AdminMoveCategoryRequest {
  export type AsObject = {
    id: string,
    parent: string,
    position: number,
  }
}

export class AdminCategoryRequest extends jspb.Message {
  getAlias(): string;
  setAlias(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminCategoryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminCategoryRequest): AdminCategoryRequest.AsObject;
  static serializeBinaryToWriter(message: AdminCategoryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminCategoryRequest;
  static deserializeBinaryFromReader(message: AdminCategoryRequest, reader: jspb.BinaryReader): AdminCategoryRequest;
}

export namespace AdminCategoryRequest {
  export type AsObject = {
    alias: string,
  }
}

export class AdminEditCategoryRequest extends jspb.Message {
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
  toObject(includeInstance?: boolean): AdminEditCategoryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminEditCategoryRequest): AdminEditCategoryRequest.AsObject;
  static serializeBinaryToWriter(message: AdminEditCategoryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminEditCategoryRequest;
  static deserializeBinaryFromReader(message: AdminEditCategoryRequest, reader: jspb.BinaryReader): AdminEditCategoryRequest;
}

export namespace AdminEditCategoryRequest {
  export type AsObject = {
    title: string,
    oldAlias: string,
    alias: string,
    description: string,
    image: string,
  }
}

export class AdminUploadCategoryRequest extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): void;

  getParentId(): number;
  setParentId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminUploadCategoryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminUploadCategoryRequest): AdminUploadCategoryRequest.AsObject;
  static serializeBinaryToWriter(message: AdminUploadCategoryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminUploadCategoryRequest;
  static deserializeBinaryFromReader(message: AdminUploadCategoryRequest, reader: jspb.BinaryReader): AdminUploadCategoryRequest;
}

export namespace AdminUploadCategoryRequest {
  export type AsObject = {
    title: string,
    parentId: number,
  }
}

export class AdminCategoryResponse extends jspb.Message {
  getCategory(): AdminCategory | undefined;
  setCategory(value?: AdminCategory): void;
  hasCategory(): boolean;
  clearCategory(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminCategoryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AdminCategoryResponse): AdminCategoryResponse.AsObject;
  static serializeBinaryToWriter(message: AdminCategoryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminCategoryResponse;
  static deserializeBinaryFromReader(message: AdminCategoryResponse, reader: jspb.BinaryReader): AdminCategoryResponse;
}

export namespace AdminCategoryResponse {
  export type AsObject = {
    category?: AdminCategory.AsObject,
  }
}

export class AdminCategoriesResponse extends jspb.Message {
  getCategoriesList(): Array<AdminCategory>;
  setCategoriesList(value: Array<AdminCategory>): void;
  clearCategoriesList(): void;
  addCategories(value?: AdminCategory, index?: number): AdminCategory;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminCategoriesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AdminCategoriesResponse): AdminCategoriesResponse.AsObject;
  static serializeBinaryToWriter(message: AdminCategoriesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminCategoriesResponse;
  static deserializeBinaryFromReader(message: AdminCategoriesResponse, reader: jspb.BinaryReader): AdminCategoriesResponse;
}

export namespace AdminCategoriesResponse {
  export type AsObject = {
    categoriesList: Array<AdminCategory.AsObject>,
  }
}

