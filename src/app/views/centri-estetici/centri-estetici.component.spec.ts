import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentriEsteticiComponent } from './centri-estetici.component';

describe('CentriEsteticiComponent', () => {
  let component: CentriEsteticiComponent;
  let fixture: ComponentFixture<CentriEsteticiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentriEsteticiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentriEsteticiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
