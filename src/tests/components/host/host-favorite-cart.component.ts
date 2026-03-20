import { Component } from '@angular/core';

import { FavoriteCartComponent } from '@pages/favorites/components/favorite-cart/favorite-cart.component';
import { MOCK_FAVORITE_DETAILED } from '@tests/constants/test.constants';

@Component({
  imports: [FavoriteCartComponent],
  template: '<app-favorite-cart [favorite]="favorite"></app-favorite-cart>',
})
export class HostFavoriteCartComponent {
  readonly favorite = MOCK_FAVORITE_DETAILED;
}
