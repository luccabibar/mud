import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsPage } from './forms.page';

describe('FormsPage', () => {
  let component: FormsPage;
  let fixture: ComponentFixture<FormsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
