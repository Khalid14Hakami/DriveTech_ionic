/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError, retry, tap, timeout } from 'rxjs/operators';
// import { AuthServiceService } from '../service/auth-service.service';

import { CmnServiceService } from '../service/cmn-service/cmn-service.service';

import { environment } from 'src/environments/environment';
import { AuthServiceService } from '../service/auth-service/auth-service.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private cmnService: CmnServiceService,
    private authService: AuthServiceService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('interceptor called');
    let req;
    const currentUser = this.authService.currentUserValue;
    console.log('currentUser : -', currentUser);
    if (currentUser) {
      req = request.clone({
        setHeaders: {
          Authorization:
            `Basic ` +
            btoa(currentUser?.username + ':' + currentUser?.password),
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
    } else {
      req = request;
    }
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (
          event instanceof HttpResponse &&
          (event.status === 200 || event.status === 201)
        ) {
        }
      }),
      catchError((errResponse: HttpErrorResponse) => {
        const err = errResponse?.error?.error;

        return throwError(errResponse);
      })
    );
  }
}
