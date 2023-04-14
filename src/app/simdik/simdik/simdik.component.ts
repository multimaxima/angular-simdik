import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikAuthStateService } from '../shared/simdik-auth-state.service';
import { SimdikAuthService } from '../shared/simdik-auth.service';
import { SimdikTokenService } from '../shared/simdik-token.service';

@Component({
  selector: 'app-simdik',
  templateUrl: './simdik.component.html',
  styleUrls: ['./simdik.component.scss']
})
export class SimdikComponent {
  title = 'SIMDIK Dashboard';
  isSignedIn!: boolean;
  profil: any={};
  logo: any;
  chat: any;
  notif: any;

  constructor(
    public _router: Router,
    private auth: SimdikAuthStateService,
    private authService: SimdikAuthService,
    public token: SimdikTokenService,
    public helper: HelperService,
    public spinner: NgxSpinnerService,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.chat = this.db.list('chat').valueChanges();
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;

      if (!this.isSignedIn) {
        this._router.navigate(['/simdik/login']);
      } else {
        this.logo = this.authService._logoWeb;
        this.getUser();
      }
    });
  }
  
  getUser(){
    this.spinner.show();
    forkJoin({
      user: this.authService.profileUser(),
      sekolah : this.authService.get('getSekolah?id_sekolah='+this.authService._idSekolah),
    }).subscribe(res=>{
      this.profil = res.user;
      this.authService._idUser = this.profil.id;
      this.authService._idTingkat = res.sekolah.strata;
      this.authService._logoWeb = res.sekolah.logo_web;
      this.authService._logoSekolah = res.sekolah.logo;
      this.logo = res.sekolah.logo_web;
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.helper.error();
    })
  }

  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this._router.navigate(['/simdik/login']);
  }
}
