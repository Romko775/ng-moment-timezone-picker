import {
  AfterViewInit,
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

export class TZone {
  name: string;
  nameValue: string;
  timeValue: string;
  group: string;
  abbr: string;
}

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
                 [notFoundText]="customNotFoundText">
      </ng-select>
    </div>
  `,
  styleUrls: ['./moment-timezone-picker.scss'],
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

  /**
   * Internals section.
   */
  timeZones: Array<TZone>;
  form: FormGroup;
  private propagateChange: (_: any) => {};
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.timeZones = momentZone.tz.names().map((zone: string) => this.formatZone(zone));
    this.form = this.fb.group({
      timezone: []
    });

    /**
     * Value change subscription.
     */
    this.form.get('timezone').valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.fireChanges());
  }

  ngAfterViewInit(): void {
    this.guessUserTimezone();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
  formatZone(zone: string): TZone {
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
    if (this.propagateChange) {
      this.propagateChange(this.form.get('timezone').value);
    }
  }

  /**
   * Clear selection.
   */
  private clearZone() {
    this.form.get('timezone').setValue(null);
  }

  /**
   * Handle parent imports changes.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.getUserZone && changes.getUserZone.currentValue) {
      this.guessUserTimezone();
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  /**
   * Handle parent model value changes.
   */
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
