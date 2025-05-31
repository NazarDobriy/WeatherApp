import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../pages/home/home.routes').then(m => m.homeRoutes),
  },
  {
    path: 'favorites',
    loadChildren: () => import('../pages/favorites/favorites.routes').then(m => m.favoritesRoutes),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];
