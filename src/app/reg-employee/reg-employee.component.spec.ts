import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegEmployeeComponent } from './reg-employee.component';

describe('RegEmployeeComponent', () => {
  let component: RegEmployeeComponent;
  let fixture: ComponentFixture<RegEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
