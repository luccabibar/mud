import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodosPage } from './metodos.page';

describe('MetodosPage', () => {
  let component: MetodosPage;
  let fixture: ComponentFixture<MetodosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetodosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
