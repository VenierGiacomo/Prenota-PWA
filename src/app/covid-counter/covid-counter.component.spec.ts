import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidCounterComponent } from './covid-counter.component';

describe('CovidCounterComponent', () => {
  let component: CovidCounterComponent;
  let fixture: ComponentFixture<CovidCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
