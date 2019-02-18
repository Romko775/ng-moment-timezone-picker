import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as momentZone from 'moment-timezone';

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
    <div class="wrapper">
      <ng-select [items]="timeZones"
                 [clearable]="false"
                 [virtualScroll]="true"
                 (change)="emitChanges($event)"
                 [groupBy]="'group'"
                 bindLabel="name"
                 [placeholder]="customPlaceholderText"
                 [(ngModel)]="userZone">
      </ng-select>
    </div>
  `,
  styleUrls: ['./moment-timezone-picker.scss']
})
export class MomentTimezonePickerComponent implements OnInit {

  @Input() customPlaceholderText = 'Choose...';
  @Input() getUserZone = false;
  @Output() onselect: EventEmitter<TZone> = new EventEmitter<TZone>();
  timeZones: Array<TZone>;
  userZone: TZone = null;

  constructor() {
  }

  ngOnInit(): void {
    this.timeZones = momentZone.tz.names().map((zone: string) => {
      return this.setObjectZone(zone);
    });
    if (this.getUserZone) {
      this.userZone = this.setObjectZone(momentZone.tz.guess(true));
      this.emitChanges(this.userZone);
    }
  }
  emitChanges(event: TZone) {
    this.onselect.emit(event);
  }

  setObjectZone(zone: string): TZone {
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

}
