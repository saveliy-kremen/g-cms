
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RozetkaService {

  constructor(private http: HttpClient) { }

  login(user: string, password: string) {

    const body = { user, password: btoa(password) };
    return this.http.post('https://api.seller.rozetka.com.ua/sites', body);
  }
}