import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampiDaCalcioComponent } from './campi-da-calcio.component';

describe('CampiDaCalcioComponent', () => {
  let component: CampiDaCalcioComponent;
  let fixture: ComponentFixture<CampiDaCalcioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampiDaCalcioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampiDaCalcioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
