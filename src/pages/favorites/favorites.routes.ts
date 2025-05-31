import { Routes } from '@angular/router';

import { FavoritesComponent } from '@pages/favorites/favorites.component';

export const favoritesRoutes: Routes = [
  {
    path: '',
    component: FavoritesComponent,
    pathMatch: 'full',
  }
];
