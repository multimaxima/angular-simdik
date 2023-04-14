import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimdikUjianDetilComponent } from './simdik-ujian-detil.component';

describe('SimdikUjianDetilComponent', () => {
  let component: SimdikUjianDetilComponent;
  let fixture: ComponentFixture<SimdikUjianDetilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimdikUjianDetilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimdikUjianDetilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
