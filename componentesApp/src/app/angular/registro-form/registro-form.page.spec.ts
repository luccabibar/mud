import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFormPage } from './registro-form.page';

describe('RegistroFormPage', () => {
  let component: RegistroFormPage;
  let fixture: ComponentFixture<RegistroFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
