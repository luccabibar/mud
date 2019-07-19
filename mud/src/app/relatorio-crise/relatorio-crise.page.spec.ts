import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioCrisePage } from './relatorio-crise.page';

describe('RelatorioCrisePage', () => {
  let component: RelatorioCrisePage;
  let fixture: ComponentFixture<RelatorioCrisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioCrisePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioCrisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
