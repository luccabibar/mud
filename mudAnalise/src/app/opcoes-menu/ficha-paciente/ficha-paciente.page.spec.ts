import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaPacientePage } from './ficha-paciente.page';

describe('FichaPacientePage', () => {
  let component: FichaPacientePage;
  let fixture: ComponentFixture<FichaPacientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaPacientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaPacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
