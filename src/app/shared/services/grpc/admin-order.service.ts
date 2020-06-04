import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'grpc-web';
import * as grpcWeb from 'grpc-web';

import { GrpcAuthHelper } from './helpers/grpc-auth-helper';

import * as GRPC from 'src/app/shared/api/v1/admin-order_pb';
import { AdminOrderServiceClient } from 'src/app/shared/api/v1/Admin-orderServiceClientPb';
import { environment } from 'src/environments/environment';
import { SessionService } from 'src/app/shared/services/session.service';

@Injectable()
export class AdminOrderGrpcService {
    client: AdminOrderServiceClient

    constructor(
        private session: SessionService,
        private grpcHelper: GrpcAuthHelper
    ) {
        this.client = new AdminOrderServiceClient(environment.grpcUrl)
    }

    public orders(page: number, pageSize: number, sort: string, direction: string): Observable<GRPC.AdminOrdersResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminOrdersRequest()
            request.setPage(page)
            request.setPageSize(pageSize)
            request.setSort(sort)
            request.setDirection(direction)
            this.client.adminOrders(request, meta, (err: grpcWeb.Error, response: GRPC.AdminOrdersResponse) => {
                if (err) {
                    return reject(err)
                }
                resolve(response)
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminOrdersResponse.AsObject>(promise);
    }

    public order(id: number): Observable<GRPC.AdminOrderResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminOrderRequest();
            request.setId(id)
            this.client.adminOrder(request, meta, (err: grpcWeb.Error, response: GRPC.AdminOrderResponse) => {
                if (err) {
                    return reject(err)
                }
                resolve(response)
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminOrderResponse.AsObject>(promise);
    }

    public deleteOrder(id: number, page: number, pageSize: number, sort: string, direction: string): Observable<GRPC.AdminOrdersResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminDeleteOrderRequest();
            request.setId(id)
            request.setPage(page)
            request.setPageSize(pageSize)
            request.setSort(sort)
            request.setDirection(direction)
            this.client.adminDeleteOrder(request, meta, (err: grpcWeb.Error, response: GRPC.AdminOrdersResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminOrdersResponse.AsObject>(promise);
    }
}
