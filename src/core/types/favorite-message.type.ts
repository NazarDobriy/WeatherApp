import { IFavoriteShortInfo } from "@core/types/favorite.interface";
import { IBaseEntity } from "@core/types/base-entity.interface";

export type FavoriteMessageType =
  | { type: 'add'; payload: IFavoriteShortInfo; }
  | { type: 'remove'; payload: IBaseEntity; }
  | { type: 'removeAll'; };
