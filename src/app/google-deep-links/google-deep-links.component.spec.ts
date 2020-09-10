import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleDeepLinksComponent } from './google-deep-links.component';

describe('GoogleDeepLinksComponent', () => {
  let component: GoogleDeepLinksComponent;
  let fixture: ComponentFixture<GoogleDeepLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleDeepLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleDeepLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
