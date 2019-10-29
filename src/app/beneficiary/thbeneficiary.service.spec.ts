import { TestBed } from '@angular/core/testing';

import { ThbeneficiaryService } from './thbeneficiary.service';

describe('ThbeneficiaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThbeneficiaryService = TestBed.get(ThbeneficiaryService);
    expect(service).toBeTruthy();
  });
});
