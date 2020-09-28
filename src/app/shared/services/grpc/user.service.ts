import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Metadata } from 'grpc-web';
import * as grpcWeb from 'grpc-web';

import { GrpcHelper } from './helpers/grpc-helper';

import { Empty } from 'src/app/shared/api/v1/google/protobuf/empty_pb';
import * as GRPC from 'src/app/shared/api/v1/user_pb';
import { UserServiceClient } from 'src/app/shared/api/v1/UserServiceClientPb';
import { environment } from 'src/environments/environment';
import { SessionService } from 'src/app/shared/services/session.service';

@Injectable()
export class UserGrpcService {
    client: UserServiceClient

    constructor(
        private session: SessionService,
        private grpcHelper: GrpcHelper
    ) {
        this.client = new UserServiceClient(environment.grpcUrl)
    }

    public register(values: any): Observable<GRPC.UserResponse.AsObject> {
        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.RegisterRequest();
            request.setFullname(values.fullname);
            request.setEmail(values.email);
            request.setPhone(values.phone);
            request.setPassword(values.password);
            const call = this.client.register(request, null, (err: grpcWeb.Error, response: GRPC.UserResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
            call.on('status', (status: grpcWeb.Status) => {
                //    console.log(status);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.UserResponse.AsObject>(promise);
    }

    public auth(values: any): Observable<GRPC.UserResponse.AsObject> {
        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AuthRequest();
            request.setLogin(values.login);
            request.setPassword(values.password);
            this.client.auth(request, null, (err: grpcWeb.Error, response: GRPC.UserResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.UserResponse.AsObject>(promise);
    }

    public me(): Observable<GRPC.UserResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new Empty();
            this.client.me(request, meta, (err: grpcWeb.Error, response: GRPC.UserResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.UserResponse.AsObject>(promise);
    }
    public users(page: number, pageSize: number, sort: string, direction: string, search: string): Observable<GRPC.AdminUsersResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminUsersRequest()
            request.setPage(page)
            request.setPageSize(pageSize)
            request.setSort(sort)
            request.setDirection(direction)
            request.setSearch(search)
            this.client.adminUsers(request, meta, (err: grpcWeb.Error, response: GRPC.AdminUsersResponse) => {
                if (err) {
                    return reject(err)
                }
                resolve(response)
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminUsersResponse.AsObject>(promise);
    }

    public user(id: number): Observable<GRPC.AdminUserResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminUserRequest()
            request.setId(id)
            this.client.adminUser(request, meta, (err: grpcWeb.Error, response: GRPC.AdminUserResponse) => {
                if (err) {
                    return reject(err)
                }
                resolve(response)
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminUserResponse.AsObject>(promise);
    }

    public editUser(values: any): Observable<GRPC.AdminUserResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminEditUserRequest();
            request.setId(values.id)
            request.setFullname(values.fullname)
            request.setShopName(values.shopName)
            request.setShopUrl(values.shopUrl)
            request.setEmail(values.email)
            request.setPhone(values.phone)
            request.setPassword(values.password)
            request.setRole(values.role)
            request.setActive(values.active)
            this.client.adminEditUser(request, meta, (err: grpcWeb.Error, response: GRPC.UserResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.UserResponse.AsObject>(promise);
    }

    public deleteUser(id: number, page: number, pageSize: number, sort: string, direction: string): Observable<GRPC.AdminUsersResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminDeleteUserRequest();
            request.setId(id)
            request.setPage(page)
            request.setPageSize(pageSize)
            request.setSort(sort)
            request.setDirection(direction)
            this.client.adminDeleteUser(request, meta, (err: grpcWeb.Error, response: GRPC.AdminUsersResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminUsersResponse.AsObject>(promise);
    }
}

