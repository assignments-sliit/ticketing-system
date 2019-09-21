import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersHomePage } from './users-home.page';

describe('UsersHomePage', () => {
  let component: UsersHomePage;
  let fixture: ComponentFixture<UsersHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
