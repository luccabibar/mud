import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoSemanalPage } from './grafico-semanal.page';

describe('GraficoSemanalPage', () => {
  let component: GraficoSemanalPage;
  let fixture: ComponentFixture<GraficoSemanalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoSemanalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoSemanalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
