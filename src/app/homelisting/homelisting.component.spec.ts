import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomelistingComponent } from './homelisting.component';

describe('HomelistingComponent', () => {
  let component: HomelistingComponent;
  let fixture: ComponentFixture<HomelistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomelistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomelistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
