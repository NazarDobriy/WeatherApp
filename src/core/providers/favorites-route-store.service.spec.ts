import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

import { FavoritesRouteStoreService } from './favorites-route-store.service';

describe('FavoritesRouteStoreService', () => {
  let service: FavoritesRouteStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoritesRouteStoreService, provideMockStore(), provideZonelessChangeDetection()],
    });
    service = TestBed.inject(FavoritesRouteStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
