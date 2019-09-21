import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTimeTablePage } from './view-time-table.page';

describe('ViewTimeTablePage', () => {
  let component: ViewTimeTablePage;
  let fixture: ComponentFixture<ViewTimeTablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTimeTablePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTimeTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
