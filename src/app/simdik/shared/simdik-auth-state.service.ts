import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SimdikTokenService } from './simdik-token.service';

@Injectable({
  providedIn: 'root'
})
export class SimdikAuthStateService {
  private userState = new BehaviorSubject<boolean>(this.token.isLoggedIn()!);
  userAuthState = this.userState.asObservable();

  constructor(
    public token: SimdikTokenService
  ) { }

  setAuthState(value: boolean) {
    this.userState.next(value);
  }
}
