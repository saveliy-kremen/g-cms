/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import {
  CurrenciesRequest,
  CurrenciesResponse,
  CurrencyRequest,
  CurrencyResponse} from './currency_pb';

export class CurrencyServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoCurrency = new grpcWeb.AbstractClientBase.MethodInfo(
    CurrencyResponse,
    (request: CurrencyRequest) => {
      return request.serializeBinary();
    },
    CurrencyResponse.deserializeBinary
  );

  currency(
    request: CurrencyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: CurrencyResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.CurrencyService/Currency',
      request,
      metadata || {},
      this.methodInfoCurrency,
      callback);
  }

  methodInfoCurrencies = new grpcWeb.AbstractClientBase.MethodInfo(
    CurrenciesResponse,
    (request: CurrenciesRequest) => {
      return request.serializeBinary();
    },
    CurrenciesResponse.deserializeBinary
  );

  currencies(
    request: CurrenciesRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: CurrenciesResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.CurrencyService/Currencies',
      request,
      metadata || {},
      this.methodInfoCurrencies,
      callback);
  }

}

