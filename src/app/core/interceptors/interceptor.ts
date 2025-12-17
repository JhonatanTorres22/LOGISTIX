import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestFormatInterceptor } from './request-format/resquest-format.interceptor';
import { HttpErrorInterceptor } from './http-error/http-error.interceptor';



export const interceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestFormatInterceptor,
    multi: true,
  },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
];
