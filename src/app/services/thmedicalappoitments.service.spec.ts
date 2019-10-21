import { TestBed } from '@angular/core/testing';

import { ThmedicalappoitmentsService } from './thmedicalappoitments.service';

describe('ThmedicalappoitmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThmedicalappoitmentsService = TestBed.get(ThmedicalappoitmentsService);
    expect(service).toBeTruthy();
  });
});
