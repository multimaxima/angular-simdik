import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WaliComponent } from './wali/wali.component';
import { WaliDashboardComponent } from './wali-dashboard/wali-dashboard.component';
import { WaliSidenavComponent } from './layout/wali-sidenav/wali-sidenav.component';
import { WaliHeaderComponent } from './layout/wali-header/wali-header.component';

const routes: Routes = [
  {
    path:'',
    component:WaliComponent,
    children:[
      {
        path:'dashboard',
        component: WaliDashboardComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    WaliComponent,
    WaliDashboardComponent,
    WaliSidenavComponent,
    WaliHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WaliModule { }
