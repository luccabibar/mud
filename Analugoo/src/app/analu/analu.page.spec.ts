import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaluPage } from './analu.page';

describe('AnaluPage', () => {
  let component: AnaluPage;
  let fixture: ComponentFixture<AnaluPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnaluPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaluPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
