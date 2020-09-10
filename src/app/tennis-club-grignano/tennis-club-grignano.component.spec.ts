import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TennisClubGrignanoComponent } from './tennis-club-grignano.component';

describe('TennisClubGrignanoComponent', () => {
  let component: TennisClubGrignanoComponent;
  let fixture: ComponentFixture<TennisClubGrignanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TennisClubGrignanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TennisClubGrignanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
