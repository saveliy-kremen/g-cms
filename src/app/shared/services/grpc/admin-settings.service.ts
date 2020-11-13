import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'grpc-web';
import * as grpcWeb from 'grpc-web';

import { GrpcAuthHelper } from './helpers/grpc-auth-helper';
import { Empty } from 'src/app/shared/api/v1/google/protobuf/empty_pb';
import * as GRPC from 'src/app/shared/api/v1/admin-settings_pb';
import { AdminSettingsServiceClient } from 'src/app/shared/api/v1/Admin-settingsServiceClientPb';
import { environment } from 'src/environments/environment';
import { SessionService } from 'src/app/shared/services/session.service';

@Injectable()
export class AdminSettingsGrpcService {
    client: AdminSettingsServiceClient

    constructor(
        private session: SessionService,
        private grpcHelper: GrpcAuthHelper
    ) {
        this.client = new AdminSettingsServiceClient(environment.grpcUrl)
    }

    public settings(): Observable<GRPC.AdminSettingsResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new Empty();
            this.client.adminSettings(request, meta, (err: grpcWeb.Error, response: GRPC.AdminSettingsResponse) => {
                if (err) {
                    return reject(err)
                }
                resolve(response)
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminSettingsResponse.AsObject>(promise);
    }

    public editSettings(value: any): Observable<GRPC.AdminSettingsResponse.AsObject> {
        const meta: Metadata = {
            Authorization: "Bearer " + this.session.getToken()
        };

        const promise = new Promise((resolve, reject) => {
            var request = new GRPC.AdminEditSettingsRequest();
            request.setRozetkaMarkup(value.rozetkaMarkup)
            this.client.adminEditSettings(request, meta, (err: grpcWeb.Error, response: GRPC.AdminSettingsResponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(response);
            });
        });
        return this.grpcHelper.grpcUnary<GRPC.AdminSettingsResponse.AsObject>(promise);
    }
}
