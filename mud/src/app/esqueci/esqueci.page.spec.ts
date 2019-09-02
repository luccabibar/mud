import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsqueciPage } from './esqueci.page';

describe('EsqueciPage', () => {
  let component: EsqueciPage;
  let fixture: ComponentFixture<EsqueciPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsqueciPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsqueciPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
