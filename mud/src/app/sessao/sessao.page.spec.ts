import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessaoPage } from './sessao.page';

describe('SessaoPage', () => {
  let component: SessaoPage;
  let fixture: ComponentFixture<SessaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
