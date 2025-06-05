import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { FavoritesStoreService } from './favorites-store.service';
import { IFavorite } from '@core/types/favorite.interface';

@Injectable()
export class NgRxLocalStorageService implements OnDestroy {
  private isInitialized = false;
  private readonly destroy$ = new Subject<void>();
  private readonly FAVORITES_KEY = 'favorites';

  constructor(private favoritesStore: FavoritesStoreService) {}

  initialization(): void {
    if (this.isInitialized) {
      return;
    }

    this.isInitialized = true;

    this.loadFromStorage();

    this.favoritesStore.favorites$.pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: (favorites: IFavorite[]) => localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites)),
    });

    window.addEventListener('storage', () => this.loadFromStorage());
  }

  private loadFromStorage(): void {
    const storageState = localStorage.getItem(this.FAVORITES_KEY);
    if (storageState) {
      this.favoritesStore.dispatchSetFavorites(JSON.parse(storageState));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
