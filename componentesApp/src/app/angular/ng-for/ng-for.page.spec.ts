import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgForPage } from './ng-for.page';

describe('NgForPage', () => {
  let component: NgForPage;
  let fixture: ComponentFixture<NgForPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgForPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgForPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
