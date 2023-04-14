import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaliHeaderComponent } from './wali-header.component';

describe('WaliHeaderComponent', () => {
  let component: WaliHeaderComponent;
  let fixture: ComponentFixture<WaliHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaliHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaliHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
