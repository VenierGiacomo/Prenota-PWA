import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCalComponent } from './display-cal.component';

describe('DisplayCalComponent', () => {
  let component: DisplayCalComponent;
  let fixture: ComponentFixture<DisplayCalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayCalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
