import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as momentZone from 'moment-timezone';

export class Zones {
  name: string;
  nameValue: string;
  timeValue: string;
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
                 bindLabel="name"
                 [placeholder]="customPlaceholderText">
      </ng-select>
    </div>
  `,
  styleUrls: ['./moment-timezone-picker.scss']
})
export class MomentTimezonePickerComponent implements OnInit {

  @Input() customPlaceholderText = 'Choose...';
  @Output() onselect: EventEmitter<Zones> = new EventEmitter<Zones>();
  timeZones: Array<Zones>;
  constructor() {
  }
  ngOnInit(): void {
    this.timeZones = momentZone.tz.names().map(zone => {
      const utc = momentZone.tz(zone).format('Z');
      return {
        name: `${zone} (${utc})`,
        nameValue: zone,
        timeValue: utc
      };
    });
  }
  emitChanges(event) {
    this.onselect.emit(event);
  }
}
