import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { CrossTabFavoritesService } from './cross-tab-favorites.service';
import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { MockFavoritesStoreService } from '@tests/providers/mock-favorites-store.service';

describe('CrossTabFavoritesService', () => {
  let service: CrossTabFavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CrossTabFavoritesService,
        provideZonelessChangeDetection(),
        { provide: FavoritesStoreService, useClass: MockFavoritesStoreService },
      ],
    });
    service = TestBed.inject(CrossTabFavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
