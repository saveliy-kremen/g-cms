import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';

import { SessionService } from 'src/app/shared/services/session.service';
import { User } from 'src/app/shared/api/v1/user_pb';
import { UserGrpcService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private user: User.AsObject;

  userChange: Subject<User.AsObject> = new Subject<User.AsObject>();

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

  getUser(): User.AsObject {
    return this.user;
  }

  async profileMe() {
    try {
      const token = await this.session.getToken()
      if (token) {
        this.userService.me().subscribe((value) => {
          this.isAuthenticated = true
          this.session.setToken(value.token)
          this.user = value.user
          this.userChange.next(this.user)
          window.localStorage.setItem('user', JSON.stringify(value.user))
        }, (err) => {
          console.log(err)
        })
      } else {
        this.logout()
      }
    } catch (err) {
      this.user = null;
    }
  }

  logout() {
    this.isAuthenticated = false
    this.user = null
    window.localStorage.clear()
    this.session.destroy()
    this.userChange.next(this.user)
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated
  }
}
