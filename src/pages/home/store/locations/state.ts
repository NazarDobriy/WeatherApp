import { ILocation } from '@core/types/location.interface';

export interface ILocationsState {
  isLoading: boolean;
  locations: ILocation[];
  error: string | null;
}

export const locationsInitialState: ILocationsState = {
  isLoading: false,
  locations: [],
  error: null
};
