import { NgModule } from '@angular/core';
import { MomentTimezonePickerComponent } from './moment-timezone-picker.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [MomentTimezonePickerComponent],
  imports: [
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [MomentTimezonePickerComponent]
})
export class MomentTimezonePickerModule { }
