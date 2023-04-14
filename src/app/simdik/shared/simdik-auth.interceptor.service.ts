import { HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SimdikTokenService } from './simdik-token.service';

@Injectable({
  providedIn: 'root'
})
export class SimdikAuthInterceptorService {

  constructor(
    private tokenService: SimdikTokenService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const accessToken = this.tokenService.getToken();
    req = req.clone({
      setHeaders: {
        Authorization: "Bearer " + accessToken,        
        ContentType: "multipart/form-data",
        Accept: "application/json",
        Enctype:"multipart/form-data",
      },
    });

    return next.handle(req);
  }
}
