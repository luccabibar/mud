import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuralPage } from './mural.page';

describe('MuralPage', () => {
  let component: MuralPage;
  let fixture: ComponentFixture<MuralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuralPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
