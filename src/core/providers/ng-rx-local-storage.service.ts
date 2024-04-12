import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { FavoritesStoreService } from './favorites-store.service';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class NgRxLocalStorageService implements OnDestroy {
  private isInitialized = false;
  private destroy$ = new Subject<void>();
  private readonly FAVORITES_KEY = 'favorites';

  constructor(
    private localStorage: LocalStorageService,
    private favoritesStore: FavoritesStoreService
  ) {}

  initialization(): void {
    if (this.isInitialized) {
      return;
    }

    this.isInitialized = true;

    this.loadFromStorage();

    this.favoritesStore.favorites$
      .pipe(takeUntil(this.destroy$))
      .subscribe((favorites) => {
        this.localStorage.set(this.FAVORITES_KEY, JSON.stringify(favorites));
      });

    window.addEventListener('storage', () => this.loadFromStorage());
  }

  private loadFromStorage(): void {
    const storageState = this.localStorage.get(this.FAVORITES_KEY);
    if (storageState) {
      this.favoritesStore.dispatchSetFavorites(JSON.parse(storageState));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
