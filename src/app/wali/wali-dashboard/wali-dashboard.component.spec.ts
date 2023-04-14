import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaliDashboardComponent } from './wali-dashboard.component';

describe('WaliDashboardComponent', () => {
  let component: WaliDashboardComponent;
  let fixture: ComponentFixture<WaliDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaliDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaliDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
