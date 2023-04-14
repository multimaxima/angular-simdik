import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiswaLoginComponent } from './siswa-login.component';

describe('SiswaLoginComponent', () => {
  let component: SiswaLoginComponent;
  let fixture: ComponentFixture<SiswaLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiswaLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiswaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
