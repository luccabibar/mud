import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestarDBPage } from './testar-db.page';

describe('TestarDBPage', () => {
  let component: TestarDBPage;
  let fixture: ComponentFixture<TestarDBPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestarDBPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestarDBPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
