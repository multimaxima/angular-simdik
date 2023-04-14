import { Component } from '@angular/core';

@Component({
  selector: 'app-simdik-dashboard',
  templateUrl: './simdik-dashboard.component.html',
  styleUrls: ['./simdik-dashboard.component.scss']
})
export class SimdikDashboardComponent {
  title: any = 'DASHBOARD';
  isSignedIn!: boolean;

  constructor() { }
}
