import { TestBed } from '@angular/core/testing';

import { FavoritesRouteStoreService } from './favorites-route-store.service';

describe('FavoritesRouteStoreService', () => {
  let service: FavoritesRouteStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesRouteStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
