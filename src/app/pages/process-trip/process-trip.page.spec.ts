import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTripPage } from './process-trip.page';

describe('ProcessTripPage', () => {
  let component: ProcessTripPage;
  let fixture: ComponentFixture<ProcessTripPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessTripPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
