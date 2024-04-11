import { TestBed } from '@angular/core/testing';

import { LocationStoreService } from './location-store.service';

describe('LocationStoreService', () => {
  let service: LocationStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
