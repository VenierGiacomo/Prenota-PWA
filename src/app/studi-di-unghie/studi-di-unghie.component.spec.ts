import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudiDiUnghieComponent } from './studi-di-unghie.component';

describe('StudiDiUnghieComponent', () => {
  let component: StudiDiUnghieComponent;
  let fixture: ComponentFixture<StudiDiUnghieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudiDiUnghieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudiDiUnghieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
