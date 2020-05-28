import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Metadata } from 'grpc-web';
import * as grpcWeb from 'grpc-web';

import { GrpcHelper } from './helpers/grpc-auth-helper';

import * as GRPC from 'src/app/shared/api/v1/vendor_pb';
import { VendorServiceClient } from 'src/app/shared/api/v1/VendorServiceClientPb';
import { environment } from 'src/environments/environment';
import { SessionService } from 'src/app/shared/services/session.service';

@Injectable()
export class VendorGrpcService {
    client: VendorServiceClient

    constructor(
        private session: SessionService,
        private grpcHelper: GrpcHelper
    ) {
        this.client = new VendorServiceClient(environment.grpcUrl)
    }

    public vendors(page: number, pageSize: number, sort: string, direction: string): Observable<GRPC.VendorsResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.VendorsRequest()
            request.setPage(page)
            request.setPageSize(pageSize)
            request.setSort(sort)
            request.setDirection(direction)
            this.client.vendors(request, meta, (err: grpcWeb.Error, response: GRPC.VendorsResponse) => {
                if (err) {
                    return reject(err)
                }
                resolve(response)
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.VendorsResponse.AsObject>(promise);
    }

    public vendor(id: number): Observable<GRPC.VendorResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.VendorRequest();
            request.setId(id)
            this.client.vendor(request, meta, (err: grpcWeb.Error, response: GRPC.VendorResponse) => {
                if (err) {
                    return reject(err)
                }
                resolve(response)
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.VendorResponse.AsObject>(promise);
    }
}
