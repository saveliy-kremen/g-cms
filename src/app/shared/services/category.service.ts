import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Metadata } from 'grpc-web';
import * as grpcWeb from 'grpc-web';

import { grpcUnary } from './helpers/grpc-unary';

import { Empty } from '../../shared/api/v1/google/protobuf/empty_pb';
import * as GRPC from '../../shared/api/v1/category_pb';
import { CategoryServiceClient } from '../../shared/api/v1/CategoryServiceClientPb';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root',
})
export class CategoryGrpcService {
    client: CategoryServiceClient;

    constructor(
        private session: SessionService
    ) {
        this.client = new CategoryServiceClient(environment.grpcUrl);
    }

    public categories(): Observable<GRPC.CategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new Empty();
            this.client.categories(request, meta, (err: grpcWeb.Error, response: GRPC.CategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<GRPC.CategoriesResponse.AsObject>(promise);
    }

    public addCategory(data): Observable<GRPC.CategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AddCategoryRequest();
            request.setId(data.id);
            request.setParent(data.parent);
            request.setText(data.text);
            this.client.addCategory(request, meta, (err: grpcWeb.Error, response: GRPC.CategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<GRPC.CategoriesResponse.AsObject>(promise);
    }

    public addCategoryBefore(data): Observable<GRPC.CategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AddCategoryRequest();
            request.setId(data.id);
            request.setParent(data.parent);
            request.setText(data.text);
            this.client.addCategoryBefore(request, meta, (err: grpcWeb.Error, response: GRPC.CategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<GRPC.CategoriesResponse.AsObject>(promise);
    }

    public addCategoryAfter(data): Observable<GRPC.CategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AddCategoryRequest();
            request.setId(data.id);
            request.setParent(data.parent);
            request.setText(data.text);
            this.client.addCategoryAfter(request, meta, (err: grpcWeb.Error, response: GRPC.CategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<GRPC.CategoriesResponse.AsObject>(promise);
    }

    public deleteCategory(id): Observable<GRPC.CategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.DeleteCategoryRequest();
            request.setId(id);
            this.client.deleteCategory(request, meta, (err: grpcWeb.Error, response: GRPC.CategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<GRPC.CategoriesResponse.AsObject>(promise);
    }

    public moveCategory(data): Observable<GRPC.CategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.MoveCategoryRequest();
            request.setId(data.id);
            request.setParent(data.parent);
            request.setPosition(data.position);
            this.client.moveCategory(request, meta, (err: grpcWeb.Error, response: GRPC.CategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<GRPC.CategoriesResponse.AsObject>(promise);
    }

    public category(alias: string): Observable<GRPC.CategoryResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.CategoryRequest();
            request.setAlias(alias);
            this.client.category(request, meta, (err: grpcWeb.Error, response: GRPC.CategoryResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<GRPC.CategoryResponse.AsObject>(promise);
    }

    public editCategory(data): Observable<GRPC.CategoryResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.EditCategoryRequest();
            request.setTitle(data.title);
            request.setOldalias(data.oldAlias);
            request.setAlias(data.alias);
            request.setDescription(data.description);
            request.setImage(data.image);
            this.client.editCategory(request, meta, (err: grpcWeb.Error, response: GRPC.CategoryResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<GRPC.CategoryResponse.AsObject>(promise);
    }
}
