import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Metadata } from 'grpc-web';
import * as grpcWeb from 'grpc-web';

import { GrpcUserHelper } from './helpers/grpc-helper';

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
        private grpcHelper: GrpcUserHelper
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
}
