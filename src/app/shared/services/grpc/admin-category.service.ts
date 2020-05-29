import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'grpc-web';
import * as grpcWeb from 'grpc-web';

import { GrpcAuthHelper } from './helpers/grpc-auth-helper';

import { Empty } from 'src/app/shared/api/v1/google/protobuf/empty_pb';
import * as GRPC from 'src/app/shared/api/v1/admin-category_pb';
import { AdminCategoryServiceClient } from 'src/app/shared/api/v1/Admin-categoryServiceClientPb';
import { environment } from 'src/environments/environment';
import { SessionService } from 'src/app/shared/services/session.service';

@Injectable()
export class AdminCategoryGrpcService {
    client: AdminCategoryServiceClient;

    constructor(
        private session: SessionService,
        private grpcHelper: GrpcAuthHelper
    ) {
        this.client = new AdminCategoryServiceClient(environment.grpcUrl)
    }

    public categories(): Observable<GRPC.AdminCategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new Empty();
            this.client.adminCategories(request, meta, (err: grpcWeb.Error, response: GRPC.AdminCategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminCategoriesResponse.AsObject>(promise);
    }

    public addCategory(data): Observable<GRPC.AdminCategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminAddCategoryRequest();
            request.setId(data.id);
            request.setParent(data.parent);
            request.setText(data.text);
            this.client.adminAddCategory(request, meta, (err: grpcWeb.Error, response: GRPC.AdminCategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminCategoriesResponse.AsObject>(promise);
    }

    public addCategoryBefore(data): Observable<GRPC.AdminCategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminAddCategoryRequest();
            request.setId(data.id);
            request.setParent(data.parent);
            request.setText(data.text);
            this.client.adminAddCategoryBefore(request, meta, (err: grpcWeb.Error, response: GRPC.AdminCategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminCategoriesResponse.AsObject>(promise);
    }

    public addCategoryAfter(data): Observable<GRPC.AdminCategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminAddCategoryRequest();
            request.setId(data.id);
            request.setParent(data.parent);
            request.setText(data.text);
            this.client.adminAddCategoryAfter(request, meta, (err: grpcWeb.Error, response: GRPC.AdminCategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminCategoriesResponse.AsObject>(promise);
    }

    public deleteCategory(id): Observable<GRPC.AdminCategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminDeleteCategoryRequest();
            request.setId(id);
            this.client.adminDeleteCategory(request, meta, (err: grpcWeb.Error, response: GRPC.AdminCategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminCategoriesResponse.AsObject>(promise);
    }

    public moveCategory(data): Observable<GRPC.AdminCategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminMoveCategoryRequest();
            request.setId(data.id);
            request.setParent(data.parent);
            request.setPosition(data.position);
            this.client.adminMoveCategory(request, meta, (err: grpcWeb.Error, response: GRPC.AdminCategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminCategoriesResponse.AsObject>(promise);
    }

    public category(alias: string): Observable<GRPC.AdminCategoryResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminCategoryRequest();
            request.setAlias(alias);
            this.client.adminCategory(request, meta, (err: grpcWeb.Error, response: GRPC.AdminCategoryResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminCategoryResponse.AsObject>(promise);
    }

    public editCategory(data): Observable<GRPC.AdminCategoryResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminEditCategoryRequest();
            request.setTitle(data.title);
            request.setOldAlias(data.oldAlias);
            request.setAlias(data.alias);
            request.setDescription(data.description);
            request.setImage(data.image);
            this.client.adminEditCategory(request, meta, (err: grpcWeb.Error, response: GRPC.AdminCategoryResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminCategoryResponse.AsObject>(promise);
    }

    public uploadCategory(data): Observable<GRPC.AdminCategoryResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminUploadCategoryRequest();
            request.setTitle(data.title);
            request.setParentId(data.parentID);
            this.client.adminUploadCategory(request, meta, (err: grpcWeb.Error, response: GRPC.AdminCategoryResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminCategoryResponse.AsObject>(promise);
    }
}
