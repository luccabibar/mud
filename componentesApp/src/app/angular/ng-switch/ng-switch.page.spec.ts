import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSwitchPage } from './ng-switch.page';

describe('NgSwitchPage', () => {
  let component: NgSwitchPage;
  let fixture: ComponentFixture<NgSwitchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgSwitchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgSwitchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
