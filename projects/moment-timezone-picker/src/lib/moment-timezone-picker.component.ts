import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import * as momentZone from 'moment-timezone';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DEFAULT_SELECT_CONFIG, formatZone, SelectConfig, TZone} from './core';

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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
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

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
  }

  /**
   * Lifecycle hooks
   */

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.getUserZone && changes.getUserZone.currentValue) {
      this.guessUserTimezone();
    }
    if (changes.disabled) {
      this.toggleTimezoneCtrl(changes.disabled.currentValue);
    }
  }

  public ngOnInit(): void {
    this.timeZones = momentZone.tz.names().map((zone: string) => formatZone(zone));
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

  private toggleTimezoneCtrl(isDisabled: boolean): void {
    isDisabled
      ? this.form.get('timezone').disable()
      : this.form.get('timezone').enable();
    this.cdr.detectChanges();
  }

  private setTimezoneChangeListener(): void {
    this.form.get('timezone').valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.fireChanges());
  }

  private guessUserTimezone(): void {
    setTimeout(() => {
      if (!this.getUserZone) {
        console.warn('User zone guess turned off');
        return;
      }
      const guessedZone = momentZone.tz.guess(true);
      this.form.get('timezone').setValue(formatZone(guessedZone));
    });
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
    this.form.get('timezone').reset();
  }

  /**
   * Access controls
   */

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateChange = fn;
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
