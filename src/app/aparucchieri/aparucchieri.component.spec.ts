import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AparucchieriComponent } from './aparucchieri.component';

describe('AparucchieriComponent', () => {
  let component: AparucchieriComponent;
  let fixture: ComponentFixture<AparucchieriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AparucchieriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AparucchieriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
