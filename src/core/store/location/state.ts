import { ILocation } from '@core/types/location.interface';

export interface ILocationState {
  isFavorite: boolean;
  isLoading: boolean;
  location: ILocation | null;
  error: string | null;
}

export const locationInitialState: ILocationState = Object.freeze({
  isFavorite: false,
  isLoading: false,
  location: null,
  error: null,
});
