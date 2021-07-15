import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeDownloadComponent } from './welcome-download.component';

describe('WelcomeDownloadComponent', () => {
  let component: WelcomeDownloadComponent;
  let fixture: ComponentFixture<WelcomeDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
