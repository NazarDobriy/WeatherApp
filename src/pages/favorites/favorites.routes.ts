import { Routes } from '@angular/router';
import { provideEffects } from "@ngrx/effects";

import { FavoritesComponent } from '@pages/favorites/favorites.component';
import { FavoritesRouteEffects } from "@core/store/favorites/routes/effects";

export const favoritesRoutes: Routes = [
  {
    path: '',
    component: FavoritesComponent,
    pathMatch: 'full',
    providers: [
      provideEffects([FavoritesRouteEffects]),
    ],
  }
];
