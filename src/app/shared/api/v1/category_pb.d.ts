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

  getUserid(): number;
  setUserid(value: number): void;

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

  getSeotitle(): string;
  setSeotitle(value: string): void;

  getSeodescription(): string;
  setSeodescription(value: string): void;

  getSeokeywords(): string;
  setSeokeywords(value: string): void;

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
    userid: number,
    text: string,
    alias: string,
    description: string,
    image: string,
    parent: string,
    sort: number,
    state?: State.AsObject,
    seotitle: string,
    seodescription: string,
    seokeywords: string,
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

