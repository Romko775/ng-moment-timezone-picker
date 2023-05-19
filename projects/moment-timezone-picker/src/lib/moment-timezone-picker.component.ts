import {AfterViewInit, Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import * as momentZone from 'moment-timezone';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DEFAULT_SELECT_CONFIG, SelectConfig, TZone} from './core';

@Component({
  selector: 'ng-moment-timezone-picker',
  template: `
    <div class="wrapper" [formGroup]="form">
      <ng-select [formControlName]="'timezone'"
                 [items]="timeZones"
                 [clearable]="clearable"
                 [virtualScroll]="virtualScroll"
                 [groupBy]="'group'"
                 bindLabel="name"
                 [placeholder]="customPlaceholderText"
                 [notFoundText]="customNotFoundText"

                 [appearance]="config.appearance"
                 [appendTo]="config.appendTo"
                 [clearOnBackspace]="config.clearOnBackspace"
                 [closeOnSelect]="config.closeOnSelect"
                 [dropdownPosition]="config.dropdownPosition"
                 [hideSelected]="config.hideSelected">
      </ng-select>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MomentTimezonePickerComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class MomentTimezonePickerComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges, ControlValueAccessor {

  /**
   * Setup section.
   */
  @Input() getUserZone = false;
  @Input() customPlaceholderText = 'Choose...';
  @Input() customNotFoundText = 'No zone found';
  @Input() clearable = false;
  @Input() virtualScroll = true;
  @Input() disabled = false;
  @Input() valueTransformFN?: (obj: TZone | null) => any;

  @Input()
  set config(conf: SelectConfig) {
    this._config = conf;
  }

  private _config: SelectConfig = DEFAULT_SELECT_CONFIG;

  get config(): SelectConfig {
    return this._config;
  }

  /**
   * Internals section.
   */
  timeZones: Array<TZone>;
  form: FormGroup = this.fb.group({
    timezone: []
  });
  private propagateChange: (_: any) => {};
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
  }

  /**
   * Lifecycle hooks
   */

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.getUserZone && changes.getUserZone.currentValue) {
      this.guessUserTimezone();
    }
    if (changes.disabled) {
      setTimeout(() => {
        changes.disabled.currentValue ? this.form.get('timezone').disable() : this.form.get('timezone').enable();
      });
    }
  }

  public ngOnInit(): void {
    this.timeZones = momentZone.tz.names().map((zone: string) => this.formatZone(zone));
    this.setTimezoneChangeListener();
  }

  public ngAfterViewInit(): void {
    this.guessUserTimezone();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Private
   */

  private setTimezoneChangeListener(): void {
    this.form.get('timezone').valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.fireChanges());
  }

  private guessUserTimezone(): void {
    setTimeout(() => {
      if (this.getUserZone) {
        const guessedZone = momentZone.tz.guess(true);
        this.form.get('timezone').setValue(this.formatZone(guessedZone));
      }
    });
  }

  /**
   * Make TZone object from simple string.
   * @link ngOnInit
   */
  private formatZone(zone: string): TZone {
    const utc: string = momentZone.tz(zone).format('Z');
    const abbr: string = momentZone.tz(zone).zoneAbbr();
    return {
      name: `${zone} (${utc})`,
      nameValue: zone,
      timeValue: utc,
      group: zone.split('/', 1)[0],
      abbr: abbr
    };
  }

  /**
   * Propagate result to parent component.
   */
  private fireChanges() {
    if (!this.propagateChange) {
      return;
    }
    const timezone = this.form.get('timezone').value;
    const transformedValue = this.valueTransformFN
      ? this.valueTransformFN(timezone)
      : timezone;
    this.propagateChange(transformedValue);
  }

  private clearZone() {
    this.form.get('timezone').setValue(null);
  }

  /**
   * Access controls
   */

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(zone: string | TZone): void {
    if (zone) {
      let _zone: TZone = null;

      if (typeof zone === 'string' && zone.length > 0) {
        _zone = this.timeZones.find(z => z.nameValue === zone);
      } else if (typeof zone === 'object') {
        _zone = this.timeZones.find(z => z.nameValue === zone.nameValue);
      }

      if (_zone) {
        this.form.get('timezone').setValue(_zone);
      }

    } else {
      this.clearZone();
    }
  }

}
