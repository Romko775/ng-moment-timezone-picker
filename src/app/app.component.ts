import {Component, OnInit} from '@angular/core';
import {SelectConfig} from '../../projects/moment-timezone-picker/src/lib/moment-timezone-picker.component';

@Component({
  selector: 'tz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  zone: any;

  zoneDisable = false;

  private _getUserZone = false;
  set getUserZone(val: boolean) {
    this._getUserZone = val;
  }

  get getUserZone(): boolean {
    return this._getUserZone;
  }

  config: SelectConfig = {
    appearance: undefined,
    appendTo: '',
    clearOnBackspace: false,
    closeOnSelect: false,
    dropdownPosition: 'auto',
    hideSelected: false
  };

  ngOnInit(): void {
    this.getUserZone = true;
    // setTimeout(() => {
    // this.zone = 'America/Los_Angeles';
    // this.zone = {
    //   'name': 'Europe/Uzhgorod (+02:00)',
    //   'nameValue': 'Europe/Uzhgorod',
    //   'timeValue': '+02:00',
    //   'group': 'Europe',
    //   'abbr': 'EET'
    // };
    // this.getUserZone = true;
    // }, 3000);
  }

  toggle() {
    this.zoneDisable = !this.zoneDisable;
  }
}
