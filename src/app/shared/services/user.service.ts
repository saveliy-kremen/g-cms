import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Metadata } from 'grpc-web';
import * as grpcWeb from 'grpc-web';

import { grpcUnary } from './helpers/grpc-unary';

import { Empty } from '../../shared/api/v1/google/protobuf/empty_pb';
import { AuthRequest, RegisterRequest, UserResponse } from '../../shared/api/v1/user_pb';
import { UserServiceClient } from '../../shared/api/v1/UserServiceClientPb';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root',
})
export class UserGrpcService {
    client: UserServiceClient;

    constructor(
        private session: SessionService
    ) {
        this.client = new UserServiceClient(environment.grpcUrl);
    }

    public register(values: any): Observable<UserResponse.AsObject> {
        const promise = new Promise((resolve, reject) => {
            var request = new RegisterRequest();
            request.setFullname(values.fullname);
            request.setEmail(values.email);
            request.setPhone(values.phone);
            request.setPassword(values.password);
            const call = this.client.register(request, null, (err: grpcWeb.Error, response: UserResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
            call.on('status', (status: grpcWeb.Status) => {
                //    console.log(status);
            });
        });
        return grpcUnary<UserResponse.AsObject>(promise);
    }

    public auth(values: any): Observable<UserResponse.AsObject> {
        const promise = new Promise((resolve, reject) => {
            var request = new AuthRequest();
            request.setLogin(values.login);
            request.setPassword(values.password);
            this.client.auth(request, null, (err: grpcWeb.Error, response: UserResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<UserResponse.AsObject>(promise);
    }

    public me(): Observable<UserResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new Empty();
            this.client.me(request, meta, (err: grpcWeb.Error, response: UserResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<UserResponse.AsObject>(promise);
    }
}
