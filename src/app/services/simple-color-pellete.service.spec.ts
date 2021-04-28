import { TestBed } from '@angular/core/testing';

import { SaimpleColorPelleteService } from './saimple-color-pellete.service';

describe('SaimpleColorPelleteService', () => {
  let service: SaimpleColorPelleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaimpleColorPelleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
