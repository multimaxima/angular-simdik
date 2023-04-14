import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CryptService } from 'src/app/shared/crypt.service';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikTokenService } from './simdik-token.service';

export class User {
  username!: String;
  password!: String;
}

@Injectable({
  providedIn: 'root'
})
export class SimdikAuthService {
  _idUser: any;
  _idSekolah = 1;
  _logoWeb: any;
  _logoSekolah: any;
  _idTingkat: any;

  constructor(
    private http: HttpClient,
    private helper: HelperService,
    public crypt: CryptService,
  ) {}  

  signin(user: User): Observable<any> {
    return this.http.post<any>(this.helper._server+'login', user);
  }

  profileUser(): Observable<any> {
    return this.http.get(this.helper._server+'profil');
  }

  get(_url: any): Observable<any> {
    return this.http.get(this.helper._server+_url);
  }

  getId(_url: any, id: any): Observable<any> {
    return this.http.get(this.helper._server+_url+'/'+this.crypt.decryptUsingAES256(id));
  }

  post(_url: any, data: any): Observable<any> {
    return this.http.post(this.helper._server+_url, data);
  }

  put(_url: any, data: any): Observable<any> {
    return this.http.put(this.helper._server+_url, data);
  }

  delete(_url: any, id: any): Observable<any> {
    return this.http.delete(this.helper._server+_url+'/'+this.crypt.decryptUsingAES256(id));
  }

  upload(_url: any, file: any): Observable<any> {
    return this.http.post(this.helper._server+_url, file);
  }

  download(_url: any): Observable<any> {
    return this.http.get(this.helper._master+_url);
  }
}
