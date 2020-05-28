import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Metadata } from 'grpc-web';
import * as grpcWeb from 'grpc-web';

import { GrpcHelper } from './helpers/grpc-auth-helper';

import * as GRPC from 'src/app/shared/api/v1/currency_pb';
import { CurrencyServiceClient } from 'src/app/shared/api/v1/CurrencyServiceClientPb';
import { environment } from 'src/environments/environment';
import { SessionService } from 'src/app/shared/services/session.service';

@Injectable()
export class CurrencyGrpcService {
    client: CurrencyServiceClient

    constructor(
        private session: SessionService,
        private grpcHelper: GrpcHelper
    ) {
        this.client = new CurrencyServiceClient(environment.grpcUrl)
    }

    public currencies(page: number, pageSize: number, sort: string, direction: string): Observable<GRPC.CurrenciesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.CurrenciesRequest()
            request.setPage(page)
            request.setPageSize(pageSize)
            request.setSort(sort)
            request.setDirection(direction)
            this.client.currencies(request, meta, (err: grpcWeb.Error, response: GRPC.CurrenciesResponse) => {
                if (err) {
                    return reject(err)
                }
                resolve(response)
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.CurrenciesResponse.AsObject>(promise);
    }

    public currency(id: number): Observable<GRPC.CurrencyResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.CurrencyRequest();
            request.setId(id)
            this.client.currency(request, meta, (err: grpcWeb.Error, response: GRPC.CurrencyResponse) => {
                if (err) {
                    return reject(err)
                }
                resolve(response)
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.CurrencyResponse.AsObject>(promise);
    }
}
