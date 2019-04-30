import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListPagePage } from './user-list-page.page';

describe('UserListPagePage', () => {
  let component: UserListPagePage;
  let fixture: ComponentFixture<UserListPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
