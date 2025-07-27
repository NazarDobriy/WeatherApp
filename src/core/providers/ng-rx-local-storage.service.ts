import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FavoritesStoreService } from './favorites-store.service';
import { IFavoriteShortInfo } from '@core/types/favorite.interface';
import { ThemeStoreService } from '@core/providers/theme-store.service';

@Injectable()
export class NgRxLocalStorageService {
  private isInitialized = false;
  private readonly THEME_KEY = 'weather_theme';
  private readonly TEMPERATURE_KEY = 'weather_temperature';
  private readonly FAVORITES_KEY = 'weather_favorites';

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

    this.loadShortFavoritesFromStorage();
    this.loadTemperatureFromStorage();
    this.loadThemeFromStorage();

    this.themeStore.isDarkMode$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (isDarkMode: boolean) => localStorage.setItem(this.THEME_KEY, JSON.stringify(isDarkMode)),
    });

    this.themeStore.isCelsius$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (isCelsius: boolean) => localStorage.setItem(this.TEMPERATURE_KEY, JSON.stringify(isCelsius)),
    });

    this.favoritesStore.shortFavorites$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (shortFavorites: IFavoriteShortInfo[]) => localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(shortFavorites)),
    });

    window.addEventListener('storage', () => {
      this.loadThemeFromStorage();
      this.loadTemperatureFromStorage();
      this.loadShortFavoritesFromStorage();
    });
  }

  private loadThemeFromStorage(): void {
    const storageState = localStorage.getItem(this.THEME_KEY);
    if (storageState) {
      this.themeStore.dispatchSetThemeMode(JSON.parse(storageState));
    }
  }

  private loadTemperatureFromStorage(): void {
    const storageState = localStorage.getItem(this.TEMPERATURE_KEY);
    if (storageState) {
      this.themeStore.dispatchSetTemperature(JSON.parse(storageState));
    }
  }

  private loadShortFavoritesFromStorage(): void {
    const storageState = localStorage.getItem(this.FAVORITES_KEY);
    if (storageState) {
      this.favoritesStore.dispatchSetShortFavorites(JSON.parse(storageState));
    }
  }

}
