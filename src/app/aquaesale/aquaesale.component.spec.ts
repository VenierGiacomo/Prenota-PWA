import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AquaesaleComponent } from './aquaesale.component';

describe('AquaesaleComponent', () => {
  let component: AquaesaleComponent;
  let fixture: ComponentFixture<AquaesaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AquaesaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AquaesaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
