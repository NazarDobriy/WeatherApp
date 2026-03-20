import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { LocationSearchDropdownService } from './location-search-dropdown.service';
import { LocationsStoreService } from '@pages/home/providers/locations-store.service';
import { MockLocationsStoreService } from '@tests/providers/mock-locations-store.service';
import { LocationSearchFormService } from '@pages/home/components/location-search/providers/location-search-form.service';
import { MockLocationSearchFormService } from '@tests/providers/mock-location-search-form.service';

describe('LocationSearchDropdownService', () => {
  let service: LocationSearchDropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        LocationSearchDropdownService,
        { provide: LocationsStoreService, useClass: MockLocationsStoreService },
        { provide: LocationSearchFormService, useClass: MockLocationSearchFormService },
      ],
    });
    service = TestBed.inject(LocationSearchDropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
