import { ILocation } from '@core/types/location.interface';

export interface ILocationState {
  isLoading: boolean;
  location: ILocation | null;
  error: string | null;
}

export const locationInitialState: ILocationState = Object.freeze({
  isLoading: false,
  location: null,
  error: null,
});
