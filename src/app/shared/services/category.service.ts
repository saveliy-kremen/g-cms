import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Metadata } from 'grpc-web';
import * as grpcWeb from 'grpc-web';

import { grpcUnary } from './helpers/grpc-unary';

import { Empty } from '../../shared/api/v1/google/protobuf/empty_pb';
import {
    AddCategoryRequest, MoveCategoryRequest, DeleteCategoryRequest,
    EditCategoryRequest, CategoryRequest, CategoriesResponse, CategoryResponse
} from '../../shared/api/v1/category_pb';
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

    public categories(): Observable<CategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new Empty();
            this.client.categories(request, meta, (err: grpcWeb.Error, response: CategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<CategoriesResponse.AsObject>(promise);
    }

    public addCategory(data): Observable<CategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new AddCategoryRequest();
            request.setId(data.id);
            request.setParent(data.parent);
            request.setText(data.text);
            this.client.addCategory(request, meta, (err: grpcWeb.Error, response: CategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<CategoriesResponse.AsObject>(promise);
    }

    public addCategoryBefore(data): Observable<CategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new AddCategoryRequest();
            request.setId(data.id);
            request.setParent(data.parent);
            request.setText(data.text);
            this.client.addCategoryBefore(request, meta, (err: grpcWeb.Error, response: CategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<CategoriesResponse.AsObject>(promise);
    }

    public addCategoryAfter(data): Observable<CategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new AddCategoryRequest();
            request.setId(data.id);
            request.setParent(data.parent);
            request.setText(data.text);
            this.client.addCategoryAfter(request, meta, (err: grpcWeb.Error, response: CategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<CategoriesResponse.AsObject>(promise);
    }

    public deleteCategory(id): Observable<CategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new DeleteCategoryRequest();
            request.setId(id);
            this.client.deleteCategory(request, meta, (err: grpcWeb.Error, response: CategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<CategoriesResponse.AsObject>(promise);
    }

    public moveCategory(data): Observable<CategoriesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new MoveCategoryRequest();
            request.setId(data.id);
            request.setParent(data.parent);
            request.setPosition(data.position);
            this.client.moveCategory(request, meta, (err: grpcWeb.Error, response: CategoriesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<CategoriesResponse.AsObject>(promise);
    }

    public category(alias: string): Observable<CategoryResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new CategoryRequest();
            request.setAlias(alias);
            this.client.category(request, meta, (err: grpcWeb.Error, response: CategoryResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<CategoryResponse.AsObject>(promise);
    }

    public editCategory(data): Observable<CategoryResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };
        const promise = new Promise((resolve, reject) => {
            var request = new EditCategoryRequest();
            request.setTitle(data.title);
            request.setOldalias(data.oldAlias);
            request.setAlias(data.alias);
            request.setDescription(data.description);
            request.setImage(data.image);
            this.client.editCategory(request, meta, (err: grpcWeb.Error, response: CategoryResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<CategoryResponse.AsObject>(promise);
    }
}
