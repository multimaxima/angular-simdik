import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaliComponent } from './wali.component';

describe('WaliComponent', () => {
  let component: WaliComponent;
  let fixture: ComponentFixture<WaliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaliComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
