import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessoesPage } from './sessoes.page';

describe('SessoesPage', () => {
  let component: SessoesPage;
  let fixture: ComponentFixture<SessoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessoesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
