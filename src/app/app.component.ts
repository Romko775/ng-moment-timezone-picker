import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'tz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  zone: any;

  private _getUserZone = false;
  set getUserZone(val: boolean) {
    this._getUserZone = val;
  }

  get getUserZone(): boolean {
    return this._getUserZone;
  }

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
}
