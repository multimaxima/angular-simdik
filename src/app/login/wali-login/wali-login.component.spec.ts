import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaliLoginComponent } from './wali-login.component';

describe('WaliLoginComponent', () => {
  let component: WaliLoginComponent;
  let fixture: ComponentFixture<WaliLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaliLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaliLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
