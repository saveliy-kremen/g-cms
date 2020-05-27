import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer, timer, from, throwError, Subject } from 'rxjs';
import { map, catchError, finalize, share, retryWhen, tap, delayWhen } from 'rxjs/operators';
import { Status, StatusCode, ClientReadableStream } from 'grpc-web';
import * as jspb from 'google-protobuf';

import { StreamType } from '../enums/stream-type.grpc.enum';
import { AuthService } from '../../auth.service';

const jwtAuthError$ = new Subject<void>();

@Injectable()
export class GrpcHelper {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  grpcUnary<T>(promise): Observable<T> {
    return from(promise).pipe(
      map((response: jspb.Message) => response.toObject()),
      catchError((error: Status) => {
        if (error.code === StatusCode.UNAUTHENTICATED) {
          this.authService.logout()
          jwtAuthError$.next();
          this.router.navigate(["/login"])
        }
        return throwError(error);
      }),
    );
  }

  grpcStream<T>(client: ClientReadableStream): Observable<T> {
    let stream: ClientReadableStream = null;
    let subscriptionCounter = 0;

    const data: Observable<any> = new Observable((observer: Observer<T>) => {
      if (subscriptionCounter === 0) {
        stream = client;
      }
      subscriptionCounter++;

      stream.on(StreamType.DATA, (response: jspb.Message) => {
        observer.next(response.toObject());
      });

      stream.on(StreamType.STATUS, (status: Status) => {
        if (status.code === StatusCode.UNAUTHENTICATED) {
          jwtAuthError$.next();
        }

        if (status.code !== StatusCode.OK) {
          observer.error(status);
        }
      });
    });

    return data.pipe(
      finalize(() => {
        subscriptionCounter--;

        if (subscriptionCounter === 0) {
          stream.cancel();
        }
      }),
      share(),
      retryWhen(errors =>
        errors.pipe(
          // log error message
          // TODO: add logger
          tap(val => console.warn(`Stream will be reconnected in 30 seconds`)),
          // restart in 30 seconds
          // TODO: fix deprecated
          delayWhen(val => timer(30000)),
        ),
      ),
    );
  }
}
