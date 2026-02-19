import { Injectable, OnDestroy } from '@angular/core';

import { FavoritesStoreService } from "@core/providers/favorites-store.service";
import { FavoriteMessageType } from "@core/types/favorite-message.type";

@Injectable({
  providedIn: 'root',
})
export class CrossTabFavoritesService implements OnDestroy {
  private readonly channel = new BroadcastChannel('favorites-channel');

  constructor(private favoritesStore: FavoritesStoreService) {
    this.listenMessage();
  }

  send(data: FavoriteMessageType): void {
    this.channel.postMessage(data);
  }

  private listenMessage(): void {
    this.channel.onmessage = ({ data }: MessageEvent<FavoriteMessageType>) => {
      switch (data.type) {
        case 'add':
          this.favoritesStore.dispatchAddShortFavorite(data.payload);
          break;
        case 'remove':
          this.favoritesStore.dispatchRemoveShortFavorite(
            data.payload.id,
            data.payload.name,
          );
          break;
        case 'removeAll':
          this.favoritesStore.dispatchRemoveFavorites();
          break;
      }
    };
  }

  ngOnDestroy(): void {
    this.channel.close();
  }

}
