import { Injectable } from '@angular/core';
import { HelperService } from 'src/app/shared/helper.service';

@Injectable({
  providedIn: 'root'
})

export class SimdikTokenService {
  private issuer = {
    login: this.helper._server+'login',
  };

  constructor(
    private helper: HelperService
  ) {}

  handleData(token: any) {
    localStorage.setItem('simdikToken', token);
  }

  getToken() {
    return localStorage.getItem('simdikToken');
  }

  isValidToken() {
    const token = this.getToken();
    
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1
          ? true
          : false;
      }
    } else {
      return false;
    }
  }

  payload(token: any) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  isLoggedIn() {
    return this.isValidToken();
  }

  removeToken() {
    localStorage.removeItem('simdikToken');
  }
}
