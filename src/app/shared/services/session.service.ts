import { Injectable, Inject, Injector, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
//import { REQUEST } from '@nguniversal/express-engine/tokens';

import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable()
export class SessionService {
  private server_request: any;

  constructor(
    injector: Injector,
    @Inject(PLATFORM_ID) platformId,
    private cookieService: CookieService) {
    if (!isPlatformBrowser(platformId)) {
      //this.server_request = injector.get(REQUEST);
    }
  }

  public getToken(): any {
    if (this.server_request) {
      return this.getCookie(this.server_request.headers.cookie, environment.jwtCoockieName);
    }
    return this.cookieService.get(environment.jwtCoockieName);
  }

  public setToken(jwt: string): void {
    this.cookieService.set(environment.jwtCoockieName, jwt, null, "/");
  }

  public destroy(): void {
    this.cookieService.deleteAll("/")
  }

  private getCookie(cookies, name) {
    const value = "; " + cookies;
    const parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }
}