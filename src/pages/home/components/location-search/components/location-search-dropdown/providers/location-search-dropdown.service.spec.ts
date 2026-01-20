import { TestBed } from '@angular/core/testing';

import { LocationSearchDropdownService } from './location-search-dropdown.service';

describe('LocationSearchDropdownService', () => {
  let service: LocationSearchDropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationSearchDropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
