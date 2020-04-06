import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Metadata } from 'grpc-web';
import * as grpcWeb from 'grpc-web';

import { grpcUnary } from './helpers/grpc-unary';

import * as GRPC from 'src/app/shared/api/v1/item_pb';
import * as CategoryGRPC from 'src/app/shared/api/v1/category_pb';
import { Empty } from 'src/app/shared/api/v1/google/protobuf/empty_pb';
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
            request.setOldPrice(data.oldPrice)
            request.setCurrencyId(data.currencyID)
            request.setDisable(data.disable)
            request.setSort(data.sort);
            request.setItemImagesList(data.itemImages)
            request.setUploadImagesList(data.uploadImages)
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
            request.setPageSize(pageSize)
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

    public getUploadImages(): Observable<GRPC.ItemImagesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new Empty();
            this.client.getUploadImages(request, meta, (err: grpcWeb.Error, response: GRPC.ItemImagesResponse) => {
                if (err) {
                    return reject(err)
                }
                resolve(response)
            });
        });
        return grpcUnary<GRPC.ItemImagesResponse.AsObject>(promise);
    }

    public itemCategories(id: number): Observable<CategoryGRPC.CategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.ItemRequest();
            request.setId(id)
            this.client.itemCategories(request, meta, (err: grpcWeb.Error, response: CategoryGRPC.CategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<CategoryGRPC.CategoriesResponse.AsObject>(promise);
    }

    public itemBindCategory(id: number, categoryID: string): Observable<CategoryGRPC.CategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.ItemBindRequest();
            request.setId(id)
            request.setCategoryId(categoryID)
            this.client.itemBindCategory(request, meta, (err: grpcWeb.Error, response: CategoryGRPC.CategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<CategoryGRPC.CategoriesResponse.AsObject>(promise);
    }

    public itemUnbindCategory(id: number, categoryID: string): Observable<CategoryGRPC.CategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.ItemBindRequest();
            request.setId(id)
            request.setCategoryId(categoryID)
            this.client.itemUnbindCategory(request, meta, (err: grpcWeb.Error, response: CategoryGRPC.CategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<CategoryGRPC.CategoriesResponse.AsObject>(promise);
    }
}
