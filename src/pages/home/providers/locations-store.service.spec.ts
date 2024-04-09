import { TestBed } from '@angular/core/testing';

import { LocationsStoreService } from './locations-store.service';

describe('LocationsStoreService', () => {
  let service: LocationsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
