import {Component} from '@angular/core';

@Component({
  selector: 'tz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  zone: string;

  setZone(event) {
    this.zone = <string>event;
  }
}
