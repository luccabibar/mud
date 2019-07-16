import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUserPage } from './perfil-user.page';

describe('PerfilUserPage', () => {
  let component: PerfilUserPage;
  let fixture: ComponentFixture<PerfilUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilUserPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
