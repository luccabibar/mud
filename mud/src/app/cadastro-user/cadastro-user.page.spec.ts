import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroUserPage } from './cadastro-user.page';

describe('CadastroUserPage', () => {
  let component: CadastroUserPage;
  let fixture: ComponentFixture<CadastroUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
