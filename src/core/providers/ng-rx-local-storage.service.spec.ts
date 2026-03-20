import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { NgRxLocalStorageService } from './ng-rx-local-storage.service';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { MockThemeStoreService } from '@tests/providers/mock-theme-store.service';
import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { MockFavoritesStoreService } from '@tests/providers/mock-favorites-store.service';
import { LocalStorageService } from '@core/providers/local-storage.service';
import { MockLocalStorageService } from '@tests/providers/mock-local-storage.service';
import { MOCK_WINDOW } from '@tests/constants/mock-window';
import { WINDOW } from '@core/tokens/window.token';

describe('NgRxLocalStorageService', () => {
  let service: NgRxLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: WINDOW, useValue: MOCK_WINDOW },
        { provide: ThemeStoreService, useClass: MockThemeStoreService },
        { provide: LocalStorageService, useClass: MockLocalStorageService },
        { provide: FavoritesStoreService, useClass: MockFavoritesStoreService },
      ],
    });
    service = TestBed.inject(NgRxLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
