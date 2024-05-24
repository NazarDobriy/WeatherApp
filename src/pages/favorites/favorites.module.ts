import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavoritesComponent } from './favorites.component';
import { FavoriteCartComponent } from './components/favorite-cart/favorite-cart.component';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [{ path: '', component: FavoritesComponent }];

@NgModule({
  declarations: [FavoritesComponent, FavoriteCartComponent],
  imports: [RouterModule.forChild(routes), SharedModule]
})
export class FavoritesModule {}
