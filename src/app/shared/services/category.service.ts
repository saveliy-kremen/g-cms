import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Metadata } from 'grpc-web';
import * as grpcWeb from 'grpc-web';

import { grpcUnary } from './helpers/grpc-unary';

import { Empty } from '../../shared/api/v1/google/protobuf/empty_pb';
import { AddCategoryRequest, DeleteCategoryRequest, CategoriesResponse } from '../../shared/api/v1/category_pb';
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
}
