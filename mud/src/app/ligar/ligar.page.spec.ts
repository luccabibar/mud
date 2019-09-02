import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigarPage } from './ligar.page';

describe('LigarPage', () => {
  let component: LigarPage;
  let fixture: ComponentFixture<LigarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
