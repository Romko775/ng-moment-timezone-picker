import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as momentZone from 'moment-timezone';

export class Zones {
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
                 [bindValue]="'nameValue'"
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
  @Output() onselect: EventEmitter<Zones> = new EventEmitter<Zones>();
  timeZones: Array<Zones>;
  userZone: string;

  constructor() {
  }

  ngOnInit(): void {
    this.getUserZone ? this.userZone = momentZone.tz.guess(true) : this.userZone = null;
    this.timeZones = momentZone.tz.names().map(zone => {
      const utc = momentZone.tz(zone).format('Z');
      const abbr = momentZone.tz(zone).zoneAbbr();
      return {
        name: `${zone} (${utc})`,
        nameValue: zone,
        timeValue: utc,
        group: zone.split('/', 1)[0],
        abbr: abbr
      };
    });
  }
  emitChanges(event) {
    this.onselect.emit(event);
  }
}
