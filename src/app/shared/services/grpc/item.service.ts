import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'grpc-web';
import * as grpcWeb from 'grpc-web';

import { GrpcHelper } from './helpers/grpc-helper';

import * as GRPC from 'src/app/shared/api/v1/item_pb';
import { ItemServiceClient } from 'src/app/shared/api/v1/itemServiceClientPb';
import { environment } from 'src/environments/environment';
import { SessionService } from 'src/app/shared/services/session.service';

@Injectable()
export class ItemGrpcService {
    client: ItemServiceClient

    constructor(
        private session: SessionService,
        private grpcHelper: GrpcHelper
    ) {
        this.client = new ItemServiceClient(environment.grpcUrl)
    }

    public items(page: number, pageSize: number, sort: string, direction: string): Observable<GRPC.ItemsResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.ItemsRequest()
            request.setPage(page)
            request.setPageSize(pageSize)
            request.setSort(sort)
            request.setDirection(direction)
            this.client.items(request, meta, (err: grpcWeb.Error, response: GRPC.ItemsResponse) => {
                if (err) {
                    return reject(err)
                }
                resolve(response)
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.ItemsResponse.AsObject>(promise);
    }

    public item(id: number): Observable<GRPC.ItemResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.ItemRequest();
            request.setId(id)
            this.client.item(request, meta, (err: grpcWeb.Error, response: GRPC.ItemResponse) => {
                if (err) {
                    return reject(err)
                }
                resolve(response)
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.ItemResponse.AsObject>(promise);
    }
}
