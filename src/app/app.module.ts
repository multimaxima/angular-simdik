import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialDesign } from 'src/material/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { SimdikLoginComponent } from './login/simdik-login/simdik-login.component';
import { SiswaLoginComponent } from './login/siswa-login/siswa-login.component';
import { WaliLoginComponent } from './login/wali-login/wali-login.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getIdPaginatorIntl } from './shared/id-paginator-intl.service';
import { SimdikAuthInterceptorService } from './simdik/shared/simdik-auth.interceptor.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { DatePipe } from '@angular/common';
import { NgxSummernoteModule } from 'ngx-summernote';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

// Expose tinymce instance to the window
declare const require: any;
(window as any).tinymce = require('tinymce');

// import synchronous mathtype-tinymce5 package
require('@wiris/mathtype-tinymce6')

@NgModule({
  declarations: [
    AppComponent,
    SimdikLoginComponent,
    SiswaLoginComponent,
    WaliLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialDesign,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    GoogleMapsModule,
    NgxSpinnerModule,
    NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate-multiple' }),
    NgxBarcode6Module, 
    NgxSummernoteModule,
    EditorModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)), 
    provideDatabase(() => getDatabase())
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SimdikAuthInterceptorService,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'id-ID'
    },
    {
      provide: MatPaginatorIntl,
      useValue: getIdPaginatorIntl()
    },
    {
      provide: FIREBASE_OPTIONS, 
      useValue: environment.firebase
    },
    { 
      provide: TINYMCE_SCRIPT_SRC, 
      useValue: 'tinymce/tinymce.min.js'
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
