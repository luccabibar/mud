import { TestBed } from '@angular/core/testing';

import { FirebasebdService } from './firebasebd.service';

describe('FirebasebdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebasebdService = TestBed.get(FirebasebdService);
    expect(service).toBeTruthy();
  });
});
