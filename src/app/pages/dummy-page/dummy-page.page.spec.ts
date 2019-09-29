import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyPagePage } from './dummy-page.page';

describe('DummyPagePage', () => {
  let component: DummyPagePage;
  let fixture: ComponentFixture<DummyPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
