import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './shared/services/auth.service';
import { SessionService } from './shared/services/session.service';
import { UserGrpcService } from './shared/services/grpc/user.service';
import { GrpcAuthHelper } from './shared/services/grpc/helpers/grpc-auth-helper';
import { GrpcHelper } from './shared/services/grpc/helpers/grpc-helper';
import { ItemGrpcService } from './shared/services/item.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [TranslateModule],
  bootstrap: [AppComponent],
  providers: [AuthService,
    SessionService,
    UserGrpcService,
    GrpcAuthHelper,
    GrpcHelper,
    ItemGrpcService
  ]
})
export class AppModule { }
