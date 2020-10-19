import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlfComponent } from './dlf.component';

describe('DlfComponent', () => {
  let component: DlfComponent;
  let fixture: ComponentFixture<DlfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
