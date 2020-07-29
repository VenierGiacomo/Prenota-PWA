import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTemplComponent } from './booking-templ.component';

describe('BookingTemplComponent', () => {
  let component: BookingTemplComponent;
  let fixture: ComponentFixture<BookingTemplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingTemplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTemplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
