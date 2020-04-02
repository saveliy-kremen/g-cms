import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Metadata } from 'grpc-web';
import * as grpcWeb from 'grpc-web';

import { grpcUnary } from './helpers/grpc-unary';

import * as GRPC from 'src/app/shared/api/v1/item_pb';
import * as CategoryGRPC from 'src/app/shared/api/v1/category_pb';
import { ItemServiceClient } from 'src/app/shared/api/v1/ItemServiceClientPb';
import { environment } from 'src/environments/environment';
import { SessionService } from 'src/app/shared/services/session.service';

@Injectable({
    providedIn: 'root',
})
export class ItemGrpcService {
    client: ItemServiceClient;

    constructor(
        private session: SessionService
    ) {
        this.client = new ItemServiceClient(environment.grpcUrl);
    }

    public items(page: number, pageSize: number, sort: string, direction: string): Observable<GRPC.ItemsResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.ItemsRequest()
            request.setPage(page)
            request.setPagesize(pageSize)
            request.setSort(sort)
            request.setDirection(direction)
            this.client.items(request, meta, (err: grpcWeb.Error, response: GRPC.ItemsResponse) => {
                if (err) {
                    return reject(err)
                }
                resolve(response)
            });
        });
        return grpcUnary<GRPC.ItemsResponse.AsObject>(promise);
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
        return grpcUnary<GRPC.ItemResponse.AsObject>(promise);
    }

    public editItem(data): Observable<GRPC.ItemResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.EditItemRequest()
            request.setId(data.id)
            request.setTitle(data.title)
            request.setArticle(data.article)
            request.setAlias(data.alias)
            request.setCount(data.count)
            request.setDescription(data.description)
            request.setPrice(data.price)
            request.setOldprice(data.oldPrice)
            request.setCurrencyid(data.currencyID)
            request.setDisable(data.disable)
            request.setSort(data.sort);
            this.client.editItem(request, meta, (err: grpcWeb.Error, response: GRPC.ItemResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<GRPC.ItemResponse.AsObject>(promise);
    }

    public deleteItem(id: number, page: number, pageSize: number, sort: string, direction: string): Observable<GRPC.ItemsResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.DeleteItemRequest();
            request.setId(id)
            request.setPage(page)
            request.setPagesize(pageSize)
            request.setSort(sort)
            request.setDirection(direction)
            this.client.deleteItem(request, meta, (err: grpcWeb.Error, response: GRPC.ItemsResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<GRPC.ItemsResponse.AsObject>(promise);
    }
}
