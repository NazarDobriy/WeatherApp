import { TestBed } from '@angular/core/testing';

import { LocationSearchFormService } from './location-search-form.service';

describe('LocationSearchFormService', () => {
  let service: LocationSearchFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationSearchFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
