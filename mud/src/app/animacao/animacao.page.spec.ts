import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimacaoPage } from './animacao.page';

describe('AnimacaoPage', () => {
  let component: AnimacaoPage;
  let fixture: ComponentFixture<AnimacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimacaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
