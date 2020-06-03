import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'grpc-web';
import * as grpcWeb from 'grpc-web';

import { GrpcAuthHelper } from './helpers/grpc-auth-helper';

import * as GRPC from 'src/app/shared/api/v1/order_pb';
import { OrderServiceClient } from 'src/app/shared/api/v1/OrderServiceClientPb';
import { environment } from 'src/environments/environment';
import { SessionService } from 'src/app/shared/services/session.service';

@Injectable()
export class OrderGrpcService {
    client: OrderServiceClient

    constructor(
        private session: SessionService,
        private grpcHelper: GrpcAuthHelper
    ) {
        this.client = new OrderServiceClient(environment.grpcUrl)
    }

    public addOrder(order): Observable<GRPC.OrderResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AddOrderRequest()
            request.setName(order.name)
            request.setPhone(order.phone)
            request.setAddress(order.address)
            request.setPayment(order.payment)
            request.setItemIdList(order.itemIds)
            this.client.addOrder(request, meta, (err: grpcWeb.Error, response: GRPC.OrderResponse) => {
                if (err) {
                    return reject(err)
                }
                resolve(response)
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.OrderResponse.AsObject>(promise);
    }
}
