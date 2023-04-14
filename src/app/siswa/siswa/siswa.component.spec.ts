import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiswaComponent } from './siswa.component';

describe('SiswaComponent', () => {
  let component: SiswaComponent;
  let fixture: ComponentFixture<SiswaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiswaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiswaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
