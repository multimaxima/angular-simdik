import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimdikPengawasanUjianComponent } from './simdik-pengawasan-ujian.component';

describe('SimdikPengawasanUjianComponent', () => {
  let component: SimdikPengawasanUjianComponent;
  let fixture: ComponentFixture<SimdikPengawasanUjianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimdikPengawasanUjianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimdikPengawasanUjianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
