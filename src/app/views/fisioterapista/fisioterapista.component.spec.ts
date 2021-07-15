import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FisioterapistaComponent } from './fisioterapista.component';

describe('FisioterapistaComponent', () => {
  let component: FisioterapistaComponent;
  let fixture: ComponentFixture<FisioterapistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FisioterapistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FisioterapistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
