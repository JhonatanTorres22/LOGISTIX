import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders,
  } from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable()
  export class RequestFormatInterceptor implements HttpInterceptor {

    constructor( 
        // private authenticationService: AuthenticationService
    ) {

    }
    // currentUser = this.authenticationService.currentUser;

    intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
      
      const headers = new HttpHeaders({

      })
      if (!request.headers.has('Content-Type')) {
          request = request.clone({
          headers: request.headers.set('Content-Type', 'application/json'),
          // setHeaders: {
          //   Authorization: `Bearer ${this.currentUser().serviceToken}`
          // }
        });
      }
      return next.handle(request);
    }
  }
  