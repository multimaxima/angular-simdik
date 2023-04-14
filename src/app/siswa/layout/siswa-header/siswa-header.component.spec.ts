import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiswaHeaderComponent } from './siswa-header.component';

describe('SiswaHeaderComponent', () => {
  let component: SiswaHeaderComponent;
  let fixture: ComponentFixture<SiswaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiswaHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiswaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
