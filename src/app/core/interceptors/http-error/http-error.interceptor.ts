import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  
  import { Observable, throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';
// import { ErrorService } from '../../services/error.service';


//   import { ErrorService } from '../../services/error/error.service';
  
  @Injectable()
  export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        // private errorService: ErrorService
    ) {}
  
    intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
      return next.handle(request).pipe(
        catchError((error) => {
          console.log(error);
          
          let errorMessage = '';
          if (error instanceof ErrorEvent) {
            errorMessage = `Client-side error: ${error.error.message}`;
          } else {
            errorMessage = `Server-side error: ${error.status} ${error.message}`;
          }
        //   this.errorService.show(errorMessage);
          return throwError(() => errorMessage);
        })
      );
    }
  }