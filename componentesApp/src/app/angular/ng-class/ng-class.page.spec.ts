import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgClassPage } from './ng-class.page';

describe('NgClassPage', () => {
  let component: NgClassPage;
  let fixture: ComponentFixture<NgClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgClassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
