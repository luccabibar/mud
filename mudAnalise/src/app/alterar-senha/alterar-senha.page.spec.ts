import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarSenhaPage } from './alterar-senha.page';

describe('AlterarSenhaPage', () => {
  let component: AlterarSenhaPage;
  let fixture: ComponentFixture<AlterarSenhaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarSenhaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarSenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
