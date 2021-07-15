import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FisioterapistiComponent } from './fisioterapisti.component';

describe('FisioterapistiComponent', () => {
  let component: FisioterapistiComponent;
  let fixture: ComponentFixture<FisioterapistiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FisioterapistiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FisioterapistiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
