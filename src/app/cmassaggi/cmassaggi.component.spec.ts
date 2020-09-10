import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmassaggiComponent } from './cmassaggi.component';

describe('CmassaggiComponent', () => {
  let component: CmassaggiComponent;
  let fixture: ComponentFixture<CmassaggiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmassaggiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmassaggiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
