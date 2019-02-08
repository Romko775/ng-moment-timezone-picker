# MomentTimezonePicker
[![NPM](https://nodei.co/npm/moment-timezone-picker.png)](https://nodei.co/npm/moment-timezone-picker/)
[![npm version](https://badge.fury.io/js/moment-timezone-picker.svg)](https://badge.fury.io/js/moment-timezone-picker)

## Dependencies
For select input [@ng-select/ng-select](https://github.com/ng-select/ng-select)
For time core [moment-timezone](https://momentjs.com/timezone/)

## Getting started
### Step 1: Install 

#### NPM
```shell
npm i moment-timezone-picker --save
```

### Step 2: Import the MomentTimezonePickerModule
```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MomentTimezonePickerModule } from 'moment-timezone-picker'; //add this

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MomentTimezonePickerModule //add this
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Step 3: Add in component html

```html
<ng-moment-timezone-picker (onselect)="yourFunc($event)" [customPlaceholderText]="yourText">
</ng-moment-timezone-picker>
```

### Step 4: Configuration
#### Inputs
| Input  | Type | Default | Required | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
|[customPlaceholderText] | `string` | `Choose...` | no | Allows you to localize the placeholder text. |

#### Outputs
| Output  | Description |
| ----------- | ------------- |
| (onselect) | Returns object {name:string; nameValue: string; timeValue: string;}

### Contributor
- [Roman Yanush](https://github.com/Romko775/)
