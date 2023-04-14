import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikAuthStateService } from 'src/app/simdik/shared/simdik-auth-state.service';
import { SimdikAuthService } from 'src/app/simdik/shared/simdik-auth.service';
import { SimdikTokenService } from 'src/app/simdik/shared/simdik-token.service';

@Component({
  selector: 'app-simdik-login',
  templateUrl: './simdik-login.component.html',
  styleUrls: ['./simdik-login.component.scss']
})
export class SimdikLoginComponent {
  loginForm: FormGroup;
  errors:any = null;
  hide: boolean = true;
  loading: boolean = false;
  isSignedIn!: boolean;
  sekolah: any;
  logo: any;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: SimdikAuthService,
    private token: SimdikTokenService,
    private authState: SimdikAuthStateService,
    public helper: HelperService,
    private http: HttpClient,
    public spinner: NgxSpinnerService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get m(){
    return this.loginForm.controls;
  }
  
  ngOnInit(): void {
    this.spinner.show();
    this.http.get(this.helper._server+'getSekolah?id_sekolah='+this.authService._idSekolah).subscribe(res=>{
      this.sekolah = res;
      this.authService._idTingkat = this.sekolah.bentuk_pendidikan;
      this.authService._logoWeb = this.sekolah.logo_web;
      this.authService._logoSekolah = this.sekolah.logo;
      this.logo = this.sekolah.logo_web;
    },err=>{
      this.helper.error();
    })

    this.authState.userAuthState.subscribe((val) => {
      this.isSignedIn = val;

      if (this.isSignedIn){
        this.router.navigate(['/simdik/dashboard']);
      }
    });

    this.spinner.hide();
  }

  onSubmit() {
    this.loading = true;
    if(this.loginForm.valid){
      this.authService.signin(this.loginForm.value).subscribe(
        (result) => {
          this.responseHandler(result);
          this.authState.setAuthState(true);
          this.loginForm.reset();
          this.router.navigate(['/simdik/dashboard']);
          this.loading = false;
        },
        (error) => {
          this.errors = error.error;
          this.loading = false;
        }
      );
    }    
  }

  responseHandler(data:any) {
    this.token.handleData(data.access_token);
  }
}
