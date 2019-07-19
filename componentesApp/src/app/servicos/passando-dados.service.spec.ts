import { TestBed } from '@angular/core/testing';

import { PassandoDadosService } from './passando-dados.service';

describe('PassandoDadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassandoDadosService = TestBed.get(PassandoDadosService);
    expect(service).toBeTruthy();
  });
});
