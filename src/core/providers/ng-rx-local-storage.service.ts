import { Inject, Injectable, OnDestroy } from '@angular/core';

import { FavoritesStoreService } from './favorites-store.service';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import {
  DAILY_REPRESENTATION_KEY,
  FAVORITES_KEY,
  TEMPERATURE_KEY,
  THEME_KEY,
} from '@core/constants/storage.constants';
import { WINDOW } from "@core/tokens/window.token";
import { ThemeType } from "@core/types/theme.type";
import { LocalStorageService } from "@core/providers/local-storage.service";
import { IFavoriteShortInfo } from "@core/types/favorite.interface";

@Injectable({
  providedIn: 'root',
})
export class NgRxLocalStorageService implements OnDestroy {
  private readonly storageListener = (event: StorageEvent) => {
    if (event.key) {
      if (event.key === THEME_KEY) {
        this.loadThemeFromStorage();
      }

      if (event.key === TEMPERATURE_KEY) {
        this.loadTemperatureFromStorage();
      }

      if (event.key === FAVORITES_KEY) {
        this.loadShortFavoritesFromStorage();
      }

      if (event.key === DAILY_REPRESENTATION_KEY) {
        this.loadDailyRepresentationFromStorage();
      }
    }
  };

  constructor(
    private themeStore: ThemeStoreService,
    private favoritesStore: FavoritesStoreService,
    private localStorageService: LocalStorageService,
    @Inject(WINDOW) private window: Window,
  ) {
    this.initialization();
  }

  private initialization(): void {
    this.loadThemeFromStorage();
    this.loadTemperatureFromStorage();
    this.loadShortFavoritesFromStorage();
    this.loadDailyRepresentationFromStorage();
    this.window.addEventListener('storage', this.storageListener);
  }

  private loadThemeFromStorage(): void {
    const storageState = this.localStorageService.get<ThemeType>(THEME_KEY);
    if (storageState !== null) {
      this.themeStore.dispatchSetThemeMode(storageState);
    }
  }

  private loadTemperatureFromStorage(): void {
    const storageState = this.localStorageService.get<boolean>(TEMPERATURE_KEY);
    if (storageState !== null) {
      this.themeStore.dispatchSetTemperature(storageState);
    }
  }

  private loadDailyRepresentationFromStorage(): void {
    const storageState = this.localStorageService.get<boolean>(DAILY_REPRESENTATION_KEY);
    if (storageState !== null) {
      this.themeStore.dispatchSetDailyRepresentation(storageState);
    }
  }

  private loadShortFavoritesFromStorage(): void {
    const storageState = this.localStorageService.get<IFavoriteShortInfo[]>(FAVORITES_KEY);
    if (storageState !== null) {
      this.favoritesStore.dispatchSetShortFavorites(storageState);
    }
  }

  ngOnDestroy(): void {
    this.window.removeEventListener('storage', this.storageListener);
  }

}
