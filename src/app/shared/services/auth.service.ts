import { Injectable } from '@angular/core';
import { Observable, Observer, BehaviorSubject, from } from 'rxjs';

import { SessionService } from 'src/app/shared/services/session.service';
import { User } from 'src/app/shared/api/v1/user_pb';
import { User as UserModel } from 'src/app/shared/models/user.model';
import { UserGrpcService } from 'src/app/shared/services/grpc/user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private user: User.AsObject;

  userChange: BehaviorSubject<User.AsObject> = new BehaviorSubject<User.AsObject>(null);

  constructor(
    private session: SessionService,
    private userService: UserGrpcService,
  ) {
  }

  login(data) {
    return Observable.create((observer: Observer<User.AsObject>) => {
      this.userService.auth(data).subscribe((value) => {
        this.isAuthenticated = true
        this.session.setToken(value.token)
        this.user = value.user
        this.userChange.next(this.user)
        window.localStorage.setItem('user', JSON.stringify(value.user))
        observer.next(value.user)
        observer.complete()
      }, (err) => {
        observer.error(err)
      })
    })
  }

  register(data) {
    return Observable.create((observer: Observer<User.AsObject>) => {
      this.userService.register(data).subscribe((value) => {
        this.isAuthenticated = true
        this.session.setToken(value.token)
        this.user = value.user
        this.userChange.next(this.user)
        window.localStorage.setItem('user', JSON.stringify(value.user))
        observer.next(value.user)
        observer.complete()
      }, (err) => {
        observer.error(err)
      })
    })
  }

  async getUser() {
    if (!this.user) {
      await this.profileMe()
    }
    return this.user;
  }

  async profileMe() {
    try {
      const token = await this.session.getToken()
      if (token) {
        const response = await this.userService.me().toPromise()
        this.isAuthenticated = true
        this.session.setToken(response.token)
        this.user = response.user
        this.userChange.next(this.user)
        window.localStorage.setItem('user', JSON.stringify(response.user))
      } else {
        this.logout()
      }
    } catch (err) {
      this.user = null;
    }
  }

  logout() {
    this.isAuthenticated = false
    this.user = new UserModel();
    window.localStorage.clear()
    this.session.destroy()
    this.userChange.next(this.user)
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated
  }
}
