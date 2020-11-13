import * as jspb from "google-protobuf"

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

export class AdminSettings extends jspb.Message {
  getRozetkaMarkup(): number;
  setRozetkaMarkup(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminSettings.AsObject;
  static toObject(includeInstance: boolean, msg: AdminSettings): AdminSettings.AsObject;
  static serializeBinaryToWriter(message: AdminSettings, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminSettings;
  static deserializeBinaryFromReader(message: AdminSettings, reader: jspb.BinaryReader): AdminSettings;
}

export namespace AdminSettings {
  export type AsObject = {
    rozetkaMarkup: number,
  }
}

export class AdminEditSettingsRequest extends jspb.Message {
  getRozetkaMarkup(): number;
  setRozetkaMarkup(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminEditSettingsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AdminEditSettingsRequest): AdminEditSettingsRequest.AsObject;
  static serializeBinaryToWriter(message: AdminEditSettingsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminEditSettingsRequest;
  static deserializeBinaryFromReader(message: AdminEditSettingsRequest, reader: jspb.BinaryReader): AdminEditSettingsRequest;
}

export namespace AdminEditSettingsRequest {
  export type AsObject = {
    rozetkaMarkup: number,
  }
}

export class AdminSettingsResponse extends jspb.Message {
  getSettings(): AdminSettings | undefined;
  setSettings(value?: AdminSettings): void;
  hasSettings(): boolean;
  clearSettings(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminSettingsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AdminSettingsResponse): AdminSettingsResponse.AsObject;
  static serializeBinaryToWriter(message: AdminSettingsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminSettingsResponse;
  static deserializeBinaryFromReader(message: AdminSettingsResponse, reader: jspb.BinaryReader): AdminSettingsResponse;
}

export namespace AdminSettingsResponse {
  export type AsObject = {
    settings?: AdminSettings.AsObject,
  }
}

