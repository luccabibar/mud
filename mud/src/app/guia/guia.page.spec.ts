import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaPage } from './guia.page';

describe('GuiaPage', () => {
  let component: GuiaPage;
  let fixture: ComponentFixture<GuiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
