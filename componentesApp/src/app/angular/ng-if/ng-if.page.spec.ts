import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgIfPage } from './ng-if.page';

describe('NgIfPage', () => {
  let component: NgIfPage;
  let fixture: ComponentFixture<NgIfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgIfPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgIfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
