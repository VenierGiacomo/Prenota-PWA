import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnticaBarbariaNapoletanaComponent } from './antica-barbaria-napoletana.component';

describe('AnticaBarbariaNapoletanaComponent', () => {
  let component: AnticaBarbariaNapoletanaComponent;
  let fixture: ComponentFixture<AnticaBarbariaNapoletanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnticaBarbariaNapoletanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnticaBarbariaNapoletanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
