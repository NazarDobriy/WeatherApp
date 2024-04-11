import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FavoritesStoreService } from 'src/core/providers/favorites-store.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent {
  favorites$ = this.favoritesStore.favorites$;

  constructor(
    private router: Router,
    private favoritesStore: FavoritesStoreService
  ) {}

  selectFavorite(id: string): void {
    console.log(id);
    this.router.navigateByUrl('/');
  }
}
