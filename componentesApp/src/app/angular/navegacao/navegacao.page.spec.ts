import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacaoPage } from './navegacao.page';

describe('NavegacaoPage', () => {
  let component: NavegacaoPage;
  let fixture: ComponentFixture<NavegacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegacaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
