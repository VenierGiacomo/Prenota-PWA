import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheGreenFactoryComponent } from './the-green-factory.component';

describe('TheGreenFactoryComponent', () => {
  let component: TheGreenFactoryComponent;
  let fixture: ComponentFixture<TheGreenFactoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheGreenFactoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheGreenFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
