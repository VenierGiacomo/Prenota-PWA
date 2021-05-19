import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroEsteticoComponent } from './centro-estetico.component';

describe('CentroEsteticoComponent', () => {
  let component: CentroEsteticoComponent;
  let fixture: ComponentFixture<CentroEsteticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroEsteticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroEsteticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
