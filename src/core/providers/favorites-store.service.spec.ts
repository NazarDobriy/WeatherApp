import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

import { FavoritesStoreService } from './favorites-store.service';

describe('FavoritesStoreService', () => {
  let service: FavoritesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoritesStoreService, provideMockStore(), provideZonelessChangeDetection()],
    });
    service = TestBed.inject(FavoritesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
