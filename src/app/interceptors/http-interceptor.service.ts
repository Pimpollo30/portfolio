import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const request = req.clone({
        setHeaders: {
          'Content-Type':  'application/json',
          'Authorization': 'Bearer '+token,
        },
      });
      return next.handle(request);
    }else {
      return next.handle(req);
    }

  }
}
