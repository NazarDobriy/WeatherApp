import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { HeaderFacadeService } from './header-facade.service';
import { AppStoreService } from '@app/providers/app-store.service';
import { MockAppStoreService } from '@tests/providers/mock-app-store.service';
import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { MockFavoritesStoreService } from '@tests/providers/mock-favorites-store.service';

describe('HeaderFacadeService', () => {
  let service: HeaderFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeaderFacadeService,
        provideZonelessChangeDetection(),
        { provide: AppStoreService, useClass: MockAppStoreService },
        { provide: FavoritesStoreService, useClass: MockFavoritesStoreService },
      ],
    });
    service = TestBed.inject(HeaderFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
