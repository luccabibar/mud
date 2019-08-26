import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalansPage } from './modalans.page';

describe('ModalansPage', () => {
  let component: ModalansPage;
  let fixture: ComponentFixture<ModalansPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalansPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalansPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
