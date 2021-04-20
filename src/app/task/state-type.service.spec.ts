import { TestBed } from '@angular/core/testing';

import { StateTypeService } from './state-type.service';

describe('StateTypeService', () => {
  let service: StateTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
