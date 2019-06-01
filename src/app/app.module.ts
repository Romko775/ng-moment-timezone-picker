import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MomentTimezonePickerModule} from '../../projects/moment-timezone-picker/src/lib/moment-timezone-picker.module';
// import {MomentTimezonePickerModule} from 'moment-timezone-picker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MomentTimezonePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
