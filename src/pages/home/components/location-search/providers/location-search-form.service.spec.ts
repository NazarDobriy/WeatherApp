import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { LocationSearchFormService } from './location-search-form.service';

describe('LocationSearchFormService', () => {
  let service: LocationSearchFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationSearchFormService, provideZonelessChangeDetection()],
    });
    service = TestBed.inject(LocationSearchFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
