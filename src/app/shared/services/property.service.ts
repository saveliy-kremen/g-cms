import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Metadata } from 'grpc-web';
import * as grpcWeb from 'grpc-web';

import { grpcUnary } from './helpers/grpc-unary';

import { Empty } from '../../shared/api/v1/google/protobuf/empty_pb';
import { PropertyResponse, PropertiesResponse, EditPropertyRequest } from '../../shared/api/v1/property_pb';
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

    public properties(): Observable<PropertiesResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new Empty();
            this.client.properties(request, meta, (err: grpcWeb.Error, response: PropertiesResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<PropertiesResponse.AsObject>(promise);
    }

    public editProperty(data): Observable<PropertyResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new EditPropertyRequest();
            request.setId(data.id);
            request.setTitle(data.title);
            request.setCode(data.code);
            request.setType(data.type);
            request.setDisplay(data.display);
            request.setPlural(data.plural);
            request.setSort(data.sort);
            this.client.editProperty(request, meta, (err: grpcWeb.Error, response: PropertyResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return grpcUnary<PropertyResponse.AsObject>(promise);
    }
}
