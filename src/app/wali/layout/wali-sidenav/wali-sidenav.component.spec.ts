import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaliSidenavComponent } from './wali-sidenav.component';

describe('WaliSidenavComponent', () => {
  let component: WaliSidenavComponent;
  let fixture: ComponentFixture<WaliSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaliSidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaliSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
