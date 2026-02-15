import { TestBed } from '@angular/core/testing';

import { CrossTabFavoritesService } from './cross-tab-favorites.service';

describe('CrossTabFavoritesService', () => {
  let service: CrossTabFavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrossTabFavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
