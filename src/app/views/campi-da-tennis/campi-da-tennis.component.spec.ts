import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampiDaTennisComponent } from './campi-da-tennis.component';

describe('CampiDaTennisComponent', () => {
  let component: CampiDaTennisComponent;
  let fixture: ComponentFixture<CampiDaTennisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampiDaTennisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampiDaTennisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
