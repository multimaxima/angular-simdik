import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SiswaComponent } from './siswa/siswa.component';
import { SiswaDashboardComponent } from './siswa-dashboard/siswa-dashboard.component';
import { SiswaHeaderComponent } from './layout/siswa-header/siswa-header.component';
import { SiswaSidenavComponent } from './layout/siswa-sidenav/siswa-sidenav.component';

const routes: Routes = [
  {
    path:'',
    component:SiswaComponent,
    children:[
      {
        path:'dashboard',
        component: SiswaDashboardComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    SiswaComponent,
    SiswaDashboardComponent,
    SiswaHeaderComponent,
    SiswaSidenavComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SiswaModule { }
