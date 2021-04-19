import { TestBed } from '@angular/core/testing';

import { InMomoryDataService } from './in-momory-data.service';

describe('InMomoryDataService', () => {
  let service: InMomoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMomoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
