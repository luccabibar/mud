import { TestBed } from '@angular/core/testing';

import { BancoService } from './banco.service';

describe('BancoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BancoService = TestBed.get(BancoService);
    expect(service).toBeTruthy();
  });

  
});


