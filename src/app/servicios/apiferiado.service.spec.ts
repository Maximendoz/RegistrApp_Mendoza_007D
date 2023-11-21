import { TestBed } from '@angular/core/testing';

import { ApiferiadoService } from './apiferiado.service';

describe('ApiferiadoService', () => {
  let service: ApiferiadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiferiadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
