
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  SERVER_URL: string = environment.uploadURL;
  constructor(
    private httpClient: HttpClient,
    private session: SessionService
  ) { }

  public upload(formData) {
    return this.httpClient.post<any>(this.SERVER_URL, formData, {
      reportProgress: true,
      observe: 'events',
      headers: {
        Authorization: "Bearer " + this.session.getToken()
      }
    });
  }
} 