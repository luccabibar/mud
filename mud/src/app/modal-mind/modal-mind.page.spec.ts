import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMindPage } from './modal-mind.page';

describe('ModalMindPage', () => {
  let component: ModalMindPage;
  let fixture: ComponentFixture<ModalMindPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMindPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMindPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
