import { Component, Input } from '@angular/core';

import { IFavorite } from 'src/core/types/favorite.interface';

@Component({
  selector: 'app-favorite-cart',
  templateUrl: './favorite-cart.component.html'
})
export class FavoriteCartComponent {
  @Input() favorite!: IFavorite;
}
