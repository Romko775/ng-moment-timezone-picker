import {Component, OnInit} from '@angular/core';
import {SelectConfig, TZone} from 'moment-timezone-picker';

@Component({
  selector: 'tz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  zone: any;
  zoneWithTransform: any;

  zoneDisable = false;

  valueTransformFN = (obj: TZone) => obj?.nameValue;

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
    hideSelected: false,
    searchable: true
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
