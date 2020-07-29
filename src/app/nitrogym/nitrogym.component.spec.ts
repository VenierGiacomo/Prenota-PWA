import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NitrogymComponent } from './nitrogym.component';

describe('NitrogymComponent', () => {
  let component: NitrogymComponent;
  let fixture: ComponentFixture<NitrogymComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NitrogymComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NitrogymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
