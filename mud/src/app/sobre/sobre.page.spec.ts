import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SobrePage } from './sobre.page';

describe('SobrePage', () => {
  let component: SobrePage;
  let fixture: ComponentFixture<SobrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SobrePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SobrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
