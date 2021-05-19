import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoDaTennisComponent } from './campo-da-tennis.component';

describe('CampoDaTennisComponent', () => {
  let component: CampoDaTennisComponent;
  let fixture: ComponentFixture<CampoDaTennisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampoDaTennisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoDaTennisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
