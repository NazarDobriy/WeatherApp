import { Injectable } from '@angular/core';

import { IFavoriteMessage } from "@core/types/favorites-channel.interface";
import { FavoritesStoreService } from "@core/providers/favorites-store.service";

@Injectable({
  providedIn: 'root',
})
export class CrossTabFavoritesService {
  private readonly channel = new BroadcastChannel('favorites-channel');

  constructor(private favoritesStore: FavoritesStoreService) {
    this.listenMessage();
  }

  send(data: IFavoriteMessage): void {
    this.channel.postMessage(data);
  }

  private listenMessage(): void {
    this.channel.onmessage = ({ data }: MessageEvent<IFavoriteMessage>) => {
      if (data.type === 'add') {
        this.favoritesStore.dispatchAddShortFavorite(data.payload);
      } else if (data.type === 'remove') {
        const { payload } = data;
        this.favoritesStore.dispatchRemoveShortFavorite(payload.id, payload.name);
      }
    };
  }

}
