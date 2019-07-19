import { TestBed } from '@angular/core/testing';

import { DadosService } from './dados.service';

describe('DadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DadosService = TestBed.get(DadosService);
    expect(service).toBeTruthy();
  });
});
