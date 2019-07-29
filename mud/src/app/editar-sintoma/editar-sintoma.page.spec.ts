import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSintomaPage } from './editar-sintoma.page';

describe('EditarSintomaPage', () => {
  let component: EditarSintomaPage;
  let fixture: ComponentFixture<EditarSintomaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarSintomaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSintomaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
