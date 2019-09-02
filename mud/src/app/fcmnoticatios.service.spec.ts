import { TestBed } from '@angular/core/testing';

import { FcmnoticatiosService } from './fcmnoticatios.service';

describe('FcmnoticatiosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FcmnoticatiosService = TestBed.get(FcmnoticatiosService);
    expect(service).toBeTruthy();
  });
});
