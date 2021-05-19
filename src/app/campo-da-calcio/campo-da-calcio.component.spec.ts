import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoDaCalcioComponent } from './campo-da-calcio.component';

describe('CampoDaCalcioComponent', () => {
  let component: CampoDaCalcioComponent;
  let fixture: ComponentFixture<CampoDaCalcioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampoDaCalcioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoDaCalcioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
