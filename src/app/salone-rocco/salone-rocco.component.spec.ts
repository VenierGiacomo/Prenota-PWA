import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaloneRoccoComponent } from './salone-rocco.component';

describe('SaloneRoccoComponent', () => {
  let component: SaloneRoccoComponent;
  let fixture: ComponentFixture<SaloneRoccoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaloneRoccoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaloneRoccoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
