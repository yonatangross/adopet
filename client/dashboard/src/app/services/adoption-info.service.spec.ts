import { TestBed } from '@angular/core/testing';

import { AdoptionInfoService } from './adoption-info.service';

describe('AdoptionInfoService', () => {
  let service: AdoptionInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdoptionInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
