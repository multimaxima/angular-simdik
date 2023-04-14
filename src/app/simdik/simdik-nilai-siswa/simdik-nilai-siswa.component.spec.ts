import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimdikNilaiSiswaComponent } from './simdik-nilai-siswa.component';

describe('SimdikNilaiSiswaComponent', () => {
  let component: SimdikNilaiSiswaComponent;
  let fixture: ComponentFixture<SimdikNilaiSiswaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimdikNilaiSiswaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimdikNilaiSiswaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
