import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiswaSidenavComponent } from './siswa-sidenav.component';

describe('SiswaSidenavComponent', () => {
  let component: SiswaSidenavComponent;
  let fixture: ComponentFixture<SiswaSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiswaSidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiswaSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
