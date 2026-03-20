import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

import { LocationStoreService } from './location-store.service';

describe('LocationStoreService', () => {
  let service: LocationStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationStoreService, provideMockStore(), provideZonelessChangeDetection()],
    });
    service = TestBed.inject(LocationStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
