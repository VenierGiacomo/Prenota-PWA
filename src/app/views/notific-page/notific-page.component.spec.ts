import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificPageComponent } from './notific-page.component';

describe('NotificPageComponent', () => {
  let component: NotificPageComponent;
  let fixture: ComponentFixture<NotificPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
