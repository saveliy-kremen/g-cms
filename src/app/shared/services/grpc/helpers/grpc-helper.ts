import { Injectable } from '@angular/core';
import { Observable, from, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Status, StatusCode } from 'grpc-web';
import * as jspb from 'google-protobuf';

const jwtAuthError$ = new Subject<void>();

@Injectable()
export class GrpcHelper {

  grpcUnary<T>(promise): Observable<T> {
    return from(promise).pipe(
      map((response: jspb.Message) => response.toObject()),
      catchError((error: Status) => {
        if (error.code === StatusCode.UNAUTHENTICATED) {
          jwtAuthError$.next();
        }
        return throwError(error);
      }),
    );
  }
}