import { IFavoriteShortInfo } from "@core/types/favorite.interface";
import { FavoriteMessageType } from "@core/types/favorite-message.type";

export interface IFavoriteMessage {
  type: FavoriteMessageType;
  payload: IFavoriteShortInfo;
}
