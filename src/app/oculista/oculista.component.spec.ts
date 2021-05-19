import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OculistaComponent } from './oculista.component';

describe('OculistaComponent', () => {
  let component: OculistaComponent;
  let fixture: ComponentFixture<OculistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OculistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OculistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
