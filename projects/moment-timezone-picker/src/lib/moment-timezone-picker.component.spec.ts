import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentTimezonePickerComponent } from './moment-timezone-picker.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormBuilder} from '@angular/forms';

describe('MomentTimezonePickerComponent', () => {
  let component: MomentTimezonePickerComponent;
  let fixture: ComponentFixture<MomentTimezonePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: [
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(MomentTimezonePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
