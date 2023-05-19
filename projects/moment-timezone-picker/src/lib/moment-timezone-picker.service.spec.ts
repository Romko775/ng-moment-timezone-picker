import { TestBed } from '@angular/core/testing';

import { MomentTimezonePickerService } from './moment-timezone-picker.service';

describe('MomentTimezonePickerService', () => {
  let service: MomentTimezonePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MomentTimezonePickerService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
