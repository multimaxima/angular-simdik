import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimdikLoginComponent } from './login/simdik-login/simdik-login.component';
import { SiswaLoginComponent } from './login/siswa-login/siswa-login.component';
import { WaliLoginComponent } from './login/wali-login/wali-login.component';

const routes: Routes = [
  { path:'simdik', loadChildren:()=>import('./simdik/simdik.module').then(mod=>mod.SimdikModule) },
  { path:'siswa', loadChildren:()=>import('./siswa/siswa.module').then(mod=>mod.SiswaModule) },
  { path:'wali', loadChildren:()=>import('./wali/wali.module').then(mod=>mod.WaliModule) },
  { path:'simdik/login', component:SimdikLoginComponent },
  { path:'siswa/login', component:SiswaLoginComponent },
  { path:'wali/login', component:WaliLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
