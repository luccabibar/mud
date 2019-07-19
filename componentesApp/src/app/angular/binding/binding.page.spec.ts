import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindingPage } from './binding.page';

describe('BindingPage', () => {
  let component: BindingPage;
  let fixture: ComponentFixture<BindingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
