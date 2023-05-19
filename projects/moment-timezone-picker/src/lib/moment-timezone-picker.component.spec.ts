import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {MomentTimezonePickerComponent} from './moment-timezone-picker.component';
import {NO_ERRORS_SCHEMA, SimpleChange} from '@angular/core';
import {UntypedFormBuilder, NG_VALUE_ACCESSOR} from '@angular/forms';
import Spy = jasmine.Spy;

const expectedTZone = {
  name: 'America/Los_Angeles (-07:00)',
  nameValue: 'America/Los_Angeles',
  timeValue: '-07:00',
  group: 'America',
  abbr: 'PDT'
};

describe('MomentTimezonePickerComponent', () => {
  let component: MomentTimezonePickerComponent;
  let fixture: ComponentFixture<MomentTimezonePickerComponent>;
  let fireChangesSpy: Spy;

  const fn = (_: any) => {
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: [
        UntypedFormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(MomentTimezonePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // @ts-ignore
    fireChangesSpy = spyOn(component, 'fireChanges');
  });

  beforeEach(() => {
    component.getUserZone = false;
    component.disabled = false;
    component.registerOnChange(fn);
    component.registerOnTouched(fn);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have value accessor', () => {
    const accessors = fixture.debugElement.injector.get(NG_VALUE_ACCESSOR);
    accessors.forEach((accessor) => {
      expect(accessor instanceof MomentTimezonePickerComponent).toBeTruthy();
    });
  });

  it('should init', () => {
    component.ngOnInit();
    expect(component.timeZones.length).toBeGreaterThan(0);
  });

  it('should register on change', () => {
    expect(component['propagateChange']).toBe(fn);
  });

  it('should handle on changes:getUserZone', fakeAsync(() => {
    component.form.get('timezone').setValue(null);
    const changes = {
      getUserZone: new SimpleChange(false, true, true)
    };
    component.getUserZone = true;
    component.ngOnChanges(changes);
    tick(1000);
    expect(component.form.get('timezone').value).not.toBeNull();
  }));

  it('should handle on changes:disabled:true', () => {
    const changes = {
      disabled: new SimpleChange(false, true, true)
    };
    component.disabled = true;
    component.ngOnChanges(changes);
    expect(component.form.get('timezone').disabled).toBeTruthy();
  });

  it('should handle on changes:disabled:false', () => {
    const changes = {
      disabled: new SimpleChange(true, false, false)
    };
    component.disabled = false;
    component.ngOnChanges(changes);
    expect(component.form.get('timezone').enable).toBeTruthy();
  });

  it('should write value and find zone as string', () => {
    const timeZone = 'America/Los_Angeles';
    component.writeValue(timeZone);
    expect(component.form.get('timezone').value).toEqual(expectedTZone);
  });

  it('should write value and find zone as TZone object', () => {
    component.writeValue({...expectedTZone});
    expect(component.form.get('timezone').value).toEqual(expectedTZone);
  });

  it('should write value and clear zone if invalid:null', () => {
    component.writeValue(null);
    expect(component.form.get('timezone').value).toEqual(null);
  });

  it('should write value and clear zone if invalid:undefined', () => {
    component.writeValue(undefined);
    expect(component.form.get('timezone').value).toEqual(null);
  });
});
