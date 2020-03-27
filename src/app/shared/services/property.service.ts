import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Metadata } from 'grpc-web';
import * as grpcWeb from 'grpc-web';

import { grpcUnary } from './helpers/grpc-unary';

import { Empty } from '../../shared/api/v1/google/protobuf/empty_pb';
import * as GRPC from '../../shared/api/v1/property_pb';
import { PropertyServiceClient } from '../../shared/api/v1/PropertyServiceClientPb';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root',
})
export class PropertyGrpcService {
    client: PropertyServiceClient;

    constructor(
        private session: SessionService
    ) {
        this.client = new PropertyServiceClient(environment.grpcUrl);
    }

    public properties(page: number, pageSize: number, sort: string, direction: string): Observable<GRPC.PropertiesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.PropertiesRequest();
            request.setPage(page)
            request.setPagesize(pageSize)
            request.setSort(sort)
            request.setDirection(direction)
            this.client.properties(request, meta, (err: grpcWeb.Error, response: GRPC.PropertiesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<GRPC.PropertiesResponse.AsObject>(promise);
    }

    public property(id: number): Observable<GRPC.PropertyResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.PropertyRequest();
            request.setId(id)
            this.client.property(request, meta, (err: grpcWeb.Error, response: GRPC.PropertyResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<GRPC.PropertyResponse.AsObject>(promise);
    }

    public editProperty(data): Observable<GRPC.PropertyResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.EditPropertyRequest();
            request.setId(data.id);
            request.setTitle(data.title);
            request.setCode(data.code);
            request.setType(data.type);
            request.setDisplay(data.display);
            request.setPlural(data.plural);
            request.setSort(data.sort);
            this.client.editProperty(request, meta, (err: grpcWeb.Error, response: GRPC.PropertyResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<GRPC.PropertyResponse.AsObject>(promise);
    }
}
