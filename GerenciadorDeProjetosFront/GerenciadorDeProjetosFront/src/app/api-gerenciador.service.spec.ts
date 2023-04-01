import { TestBed } from '@angular/core/testing';

import { ApiGerenciadorService } from './api-gerenciador.service';

describe('ApiGerenciadorService', () => {
  let service: ApiGerenciadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGerenciadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
