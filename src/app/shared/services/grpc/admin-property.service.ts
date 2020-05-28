import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'grpc-web';
import * as grpcWeb from 'grpc-web';

import { GrpcHelper } from './helpers/grpc-auth-helper';

import * as GRPC from 'src/app/shared/api/v1/admin-property_pb';
import * as CategoryGRPC from 'src/app/shared/api/v1/admin-category_pb';
import { AdminPropertyServiceClient } from 'src/app/shared/api/v1/Admin-propertyServiceClientPb';
import { environment } from 'src/environments/environment';
import { SessionService } from 'src/app/shared/services/session.service';

@Injectable()
export class AdminPropertyGrpcService {
    client: AdminPropertyServiceClient

    constructor(
        private session: SessionService,
        private grpcHelper: GrpcHelper
    ) {
        this.client = new AdminPropertyServiceClient(environment.grpcUrl);
    }

    public properties(page: number, pageSize: number, sort: string, direction: string): Observable<GRPC.AdminPropertiesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminPropertiesRequest();
            request.setPage(page)
            request.setPageSize(pageSize)
            request.setSort(sort)
            request.setDirection(direction)
            this.client.adminProperties(request, meta, (err: grpcWeb.Error, response: GRPC.AdminPropertiesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminPropertiesResponse.AsObject>(promise);
    }

    public property(id: number): Observable<GRPC.AdminPropertyResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminPropertyRequest();
            request.setId(id)
            this.client.adminProperty(request, meta, (err: grpcWeb.Error, response: GRPC.AdminPropertyResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminPropertyResponse.AsObject>(promise);
    }

    public editProperty(data): Observable<GRPC.AdminPropertyResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminEditPropertyRequest();
            request.setId(data.id);
            request.setTitle(data.title);
            request.setCode(data.code);
            request.setType(data.type);
            request.setDisplay(data.display);
            request.setRequired(data.required);
            request.setMultiple(data.multiple);
            request.setSort(data.sort);
            this.client.adminEditProperty(request, meta, (err: grpcWeb.Error, response: GRPC.AdminPropertyResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminPropertyResponse.AsObject>(promise);
    }

    public deleteProperty(id: number, page: number, pageSize: number, sort: string, direction: string): Observable<GRPC.AdminPropertiesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminDeletePropertyRequest();
            request.setId(id)
            request.setPage(page)
            request.setPageSize(pageSize)
            request.setSort(sort)
            request.setDirection(direction)
            this.client.adminDeleteProperty(request, meta, (err: grpcWeb.Error, response: GRPC.AdminPropertiesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminPropertiesResponse.AsObject>(promise);
    }

    public propertyCategories(id: number): Observable<CategoryGRPC.AdminCategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminPropertyRequest();
            request.setId(id)
            this.client.adminPropertyCategories(request, meta, (err: grpcWeb.Error, response: CategoryGRPC.AdminCategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<CategoryGRPC.AdminCategoriesResponse.AsObject>(promise);
    }

    public propertyBindCategory(id: number, categoryID: string): Observable<CategoryGRPC.AdminCategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminPropertyBindRequest();
            request.setId(id)
            request.setCategoryId(categoryID)
            this.client.adminPropertyBindCategory(request, meta, (err: grpcWeb.Error, response: CategoryGRPC.AdminCategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<CategoryGRPC.AdminCategoriesResponse.AsObject>(promise);
    }

    public propertyUnbindCategory(id: number, categoryID: string): Observable<CategoryGRPC.AdminCategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminPropertyBindRequest();
            request.setId(id)
            request.setCategoryId(categoryID)
            this.client.adminPropertyUnbindCategory(request, meta, (err: grpcWeb.Error, response: CategoryGRPC.AdminCategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<CategoryGRPC.AdminCategoriesResponse.AsObject>(promise);
    }

    public editPropertyValue(data, propertyValue): Observable<GRPC.AdminPropertyResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminEditPropertyValueRequest();
            request.setId(data.propertyValue.id)
            request.setPropertyId(data.property.id)
            request.setValue(propertyValue.value)
            request.setSort(propertyValue.sort)
            request.setImage(propertyValue.image)
            this.client.adminEditPropertyValue(request, meta, (err: grpcWeb.Error, response: GRPC.AdminPropertyResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminPropertyResponse.AsObject>(promise);
    }

    public deletePropertyValue(id: number): Observable<GRPC.AdminPropertyResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminPropertyValueRequest();
            request.setId(id)
            this.client.adminDeletePropertyValue(request, meta, (err: grpcWeb.Error, response: GRPC.AdminPropertyResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminPropertyResponse.AsObject>(promise);
    }

    public uploadProperty(data): Observable<GRPC.AdminPropertyResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminUploadPropertyRequest();
            request.setTitle(data.title)
            request.setValue(data.value)
            request.setItemId(data.itemID)
            this.client.adminUploadProperty(request, meta, (err: grpcWeb.Error, response: GRPC.AdminPropertyResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminPropertyResponse.AsObject>(promise);
    }
}
