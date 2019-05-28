import { TestBed } from '@angular/core/testing';

import { SingletonService } from './singleton.service';

describe('SingletonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SingletonService = TestBed.get(SingletonService);
    expect(service).toBeTruthy();
  });
});
