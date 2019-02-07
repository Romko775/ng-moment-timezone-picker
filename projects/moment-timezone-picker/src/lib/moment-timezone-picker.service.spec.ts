import { TestBed } from '@angular/core/testing';

import { MomentTimezonePickerService } from './moment-timezone-picker.service';

describe('MomentTimezonePickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MomentTimezonePickerService = TestBed.get(MomentTimezonePickerService);
    expect(service).toBeTruthy();
  });
});
