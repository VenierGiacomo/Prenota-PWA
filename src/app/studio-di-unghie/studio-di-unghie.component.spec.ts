import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioDiUnghieComponent } from './studio-di-unghie.component';

describe('StudioDiUnghieComponent', () => {
  let component: StudioDiUnghieComponent;
  let fixture: ComponentFixture<StudioDiUnghieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudioDiUnghieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioDiUnghieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
