import { ILocation } from '@core/types/location.interface';

export interface ILocationsState {
  isLoading: boolean;
  locations: ILocation[] | null;
  error: string | null;
}

export const locationsInitialState: ILocationsState = {
  isLoading: false,
  locations: null,
  error: null
};
