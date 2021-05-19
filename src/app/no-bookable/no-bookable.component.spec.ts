import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoBookableComponent } from './no-bookable.component';

describe('NoBookableComponent', () => {
  let component: NoBookableComponent;
  let fixture: ComponentFixture<NoBookableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoBookableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoBookableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
