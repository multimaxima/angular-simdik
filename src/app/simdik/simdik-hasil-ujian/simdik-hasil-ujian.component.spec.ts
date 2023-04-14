import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimdikHasilUjianComponent } from './simdik-hasil-ujian.component';

describe('SimdikHasilUjianComponent', () => {
  let component: SimdikHasilUjianComponent;
  let fixture: ComponentFixture<SimdikHasilUjianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimdikHasilUjianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimdikHasilUjianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
