import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPage } from './load.page';

describe('LoadPage', () => {
  let component: LoadPage;
  let fixture: ComponentFixture<LoadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
