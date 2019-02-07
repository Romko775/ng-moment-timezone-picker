import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentTimezonePickerComponent } from './moment-timezone-picker.component';

describe('MomentTimezonePickerComponent', () => {
  let component: MomentTimezonePickerComponent;
  let fixture: ComponentFixture<MomentTimezonePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MomentTimezonePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentTimezonePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
