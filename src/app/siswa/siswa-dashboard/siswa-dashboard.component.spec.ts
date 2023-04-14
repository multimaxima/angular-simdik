import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiswaDashboardComponent } from './siswa-dashboard.component';

describe('SiswaDashboardComponent', () => {
  let component: SiswaDashboardComponent;
  let fixture: ComponentFixture<SiswaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiswaDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiswaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
