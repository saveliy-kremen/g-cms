import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Metadata } from 'grpc-web';
import * as grpcWeb from 'grpc-web';

import { grpcUnary } from './helpers/grpc-unary';

import * as GRPC from 'src/app/shared/api/v1/admin-item_pb';
import * as CategoryGRPC from 'src/app/shared/api/v1/admin-category_pb';
import * as PropertyGRPC from 'src/app/shared/api/v1/admin-property_pb';
import { Empty } from 'src/app/shared/api/v1/google/protobuf/empty_pb';
import { AdminItemServiceClient } from 'src/app/shared/api/v1/Admin-itemServiceClientPb';
import { environment } from 'src/environments/environment';
import { SessionService } from 'src/app/shared/services/session.service';

@Injectable({
    providedIn: 'root',
})
export class AdminItemGrpcService {
    client: AdminItemServiceClient;

    constructor(
        private session: SessionService
    ) {
        this.client = new AdminItemServiceClient(environment.grpcUrl);
    }

    public items(page: number, pageSize: number, sort: string, direction: string): Observable<GRPC.AdminItemsResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminItemsRequest()
            request.setPage(page)
            request.setPageSize(pageSize)
            request.setSort(sort)
            request.setDirection(direction)
            this.client.adminItems(request, meta, (err: grpcWeb.Error, response: GRPC.AdminItemsResponse) => {
                if (err) {
                    return reject(err)
                }
                resolve(response)
            });
        });
        return grpcUnary<GRPC.AdminItemsResponse.AsObject>(promise);
    }

    public item(id: number): Observable<GRPC.AdminItemResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminItemRequest();
            request.setId(id)
            this.client.adminItem(request, meta, (err: grpcWeb.Error, response: GRPC.AdminItemResponse) => {
                if (err) {
                    return reject(err)
                }
                resolve(response)
            });
        });
        return grpcUnary<GRPC.AdminItemResponse.AsObject>(promise);
    }

    public createDraftItem(parentID: number): Observable<GRPC.AdminItemResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminDraftRequest();
            request.setParentId(parentID)
            this.client.adminCreateDraftItem(request, meta, (err: grpcWeb.Error, response: GRPC.AdminItemResponse) => {
                if (err) {
                    return reject(err)
                }
                resolve(response)
            });
        });
        return grpcUnary<GRPC.AdminItemResponse.AsObject>(promise);
    }

    public editItem(data): Observable<GRPC.AdminItemResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminEditItemRequest()
            request.setId(data.id)
            request.setTitle(data.title)
            request.setParentId(data.parentID)
            request.setArticle(data.article)
            request.setAlias(data.alias)
            request.setCount(data.count)
            request.setInstock(data.inStock)
            request.setDescription(data.description)
            request.setVendorId(data.vendorId)
            request.setPrice(data.price)
            request.setOldPrice(data.oldPrice)
            request.setCurrencyId(data.currencyId)
            request.setDisable(data.disable)
            request.setSort(data.sort);
            request.setItemImagesList(data.itemImages)
            request.setUploadImagesList(data.uploadImages)
            request.setPropertiesList(data.properties.map(item => {
                const wrapper = new GRPC.AdminItemProperty
                const code = Object.keys(item)[0]
                if (item[code]) {
                    wrapper.setCode(code)
                    if (Array.isArray(item[code])) {
                        for (const value of item[code]) {
                            wrapper.addPropertyValueIds(value)
                        }
                    } else {
                        wrapper.addPropertyValueIds(item[code])
                    }
                }
                return wrapper
            }))
            this.client.adminEditItem(request, meta, (err: grpcWeb.Error, response: GRPC.AdminItemResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<GRPC.AdminItemResponse.AsObject>(promise);
    }

    public deleteItem(id: number, page: number, pageSize: number, sort: string, direction: string): Observable<GRPC.AdminItemsResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminDeleteItemRequest();
            request.setId(id)
            request.setPage(page)
            request.setPageSize(pageSize)
            request.setSort(sort)
            request.setDirection(direction)
            this.client.adminDeleteItem(request, meta, (err: grpcWeb.Error, response: GRPC.AdminItemsResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<GRPC.AdminItemsResponse.AsObject>(promise);
    }

    public getUploadImages(): Observable<GRPC.AdminItemImagesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new Empty();
            this.client.adminGetUploadImages(request, meta, (err: grpcWeb.Error, response: GRPC.AdminItemImagesResponse) => {
                if (err) {
                    return reject(err)
                }
                resolve(response)
            });
        });
        return grpcUnary<GRPC.AdminItemImagesResponse.AsObject>(promise);
    }

    public itemCategories(id: number): Observable<CategoryGRPC.AdminCategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminItemRequest();
            request.setId(id)
            this.client.adminItemCategories(request, meta, (err: grpcWeb.Error, response: CategoryGRPC.AdminCategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<CategoryGRPC.AdminCategoriesResponse.AsObject>(promise);
    }

    public itemBindCategory(id: number, categoryID: string): Observable<CategoryGRPC.AdminCategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminItemBindRequest();
            request.setId(id)
            request.setCategoryId(categoryID)
            this.client.adminItemBindCategory(request, meta, (err: grpcWeb.Error, response: CategoryGRPC.AdminCategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<CategoryGRPC.AdminCategoriesResponse.AsObject>(promise);
    }

    public itemUnbindCategory(id: number, categoryID: string): Observable<CategoryGRPC.AdminCategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminItemBindRequest();
            request.setId(id)
            request.setCategoryId(categoryID)
            this.client.adminItemUnbindCategory(request, meta, (err: grpcWeb.Error, response: CategoryGRPC.AdminCategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<CategoryGRPC.AdminCategoriesResponse.AsObject>(promise);
    }

    public itemProperties(id: number): Observable<PropertyGRPC.AdminPropertiesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminItemRequest();
            request.setId(id)
            this.client.adminItemProperties(request, meta, (err: grpcWeb.Error, response: PropertyGRPC.AdminPropertiesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<PropertyGRPC.AdminPropertiesResponse.AsObject>(promise);
    }

    public itemOffers(item_id: number, page: number, pageSize: number, sort: string, direction: string): Observable<GRPC.AdminOffersResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminOffersRequest();
            request.setItemId(item_id)
            request.setPage(page)
            request.setPageSize(pageSize)
            request.setSort(sort)
            request.setDirection(direction)
            this.client.adminItemOffers(request, meta, (err: grpcWeb.Error, response: GRPC.AdminOffersResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<GRPC.AdminOffersResponse.AsObject>(promise);
    }

    public deleteOffer(id: number, parent_id: number, page: number, pageSize: number, sort: string, direction: string): Observable<GRPC.AdminOffersResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminDeleteOfferRequest();
            request.setId(id)
            request.setParentId(parent_id)
            request.setPage(page)
            request.setPageSize(pageSize)
            request.setSort(sort)
            request.setDirection(direction)
            this.client.adminDeleteOffer(request, meta, (err: grpcWeb.Error, response: GRPC.AdminOffersResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<GRPC.AdminOffersResponse.AsObject>(promise);
    }

    public uploadOffer(data): Observable<GRPC.AdminItemResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminUploadOfferRequest()
            request.setTitle(data.title)
            request.setParentId(data.parentID)
            request.setCategoryId(data.categoryID)
            request.setPrice(data.price)
            request.setCurrency(data.currency)
            request.setCount(data.count)
            request.setInstock(data.inStock)
            request.setDescription(data.description)
            request.setVendor(data.vendor)
            request.setCountry(data.country)
            request.setImagesList(data.images)
            this.client.adminUploadOffer(request, meta, (err: grpcWeb.Error, response: GRPC.AdminItemResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<GRPC.AdminItemResponse.AsObject>(promise);
    }
}
