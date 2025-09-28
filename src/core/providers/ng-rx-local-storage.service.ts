import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FavoritesStoreService } from './favorites-store.service';
import { IFavoriteShortInfo } from '@core/types/favorite.interface';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { DAILY_REPRESENTATION_KEY, FAVORITES_KEY, TEMPERATURE_KEY, THEME_KEY } from '@core/constants/storage.constants';

@Injectable()
export class NgRxLocalStorageService {
  private isInitialized = false;

  constructor(
    private destroyRef: DestroyRef,
    private themeStore: ThemeStoreService,
    private favoritesStore: FavoritesStoreService,
  ) {}

  initialization(): void {
    if (this.isInitialized) {
      return;
    }

    this.isInitialized = true;

    this.loadThemeFromStorage();
    this.loadTemperatureFromStorage();
    this.loadShortFavoritesFromStorage();
    this.loadDailyRepresentationFromStorage();

    this.themeStore.isDarkMode$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (isDarkMode: boolean) => localStorage.setItem(THEME_KEY, JSON.stringify(isDarkMode)),
    });

    this.themeStore.isCelsius$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (isCelsius: boolean) => localStorage.setItem(TEMPERATURE_KEY, JSON.stringify(isCelsius)),
    });

    this.themeStore.isChartRepresentation$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (isChartRepresentation: boolean) => localStorage.setItem(DAILY_REPRESENTATION_KEY, JSON.stringify(isChartRepresentation)),
    });

    this.favoritesStore.shortFavorites$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (shortFavorites: IFavoriteShortInfo[]) => localStorage.setItem(FAVORITES_KEY, JSON.stringify(shortFavorites)),
    });

    window.addEventListener('storage', () => {
      this.loadThemeFromStorage();
      this.loadTemperatureFromStorage();
      this.loadShortFavoritesFromStorage();
      this.loadDailyRepresentationFromStorage();
    });
  }

  private loadThemeFromStorage(): void {
    const storageState = localStorage.getItem(THEME_KEY);
    if (storageState) {
      this.themeStore.dispatchSetThemeMode(JSON.parse(storageState));
    }
  }

  private loadTemperatureFromStorage(): void {
    const storageState = localStorage.getItem(TEMPERATURE_KEY);
    if (storageState) {
      this.themeStore.dispatchSetTemperature(JSON.parse(storageState));
    }
  }

  private loadDailyRepresentationFromStorage(): void {
    const storageState = localStorage.getItem(DAILY_REPRESENTATION_KEY);
    if (storageState) {
      this.themeStore.dispatchSetDailyRepresentation(JSON.parse(storageState));
    }
  }

  private loadShortFavoritesFromStorage(): void {
    const storageState = localStorage.getItem(FAVORITES_KEY);
    if (storageState) {
      this.favoritesStore.dispatchSetShortFavorites(JSON.parse(storageState));
    }
  }

}
