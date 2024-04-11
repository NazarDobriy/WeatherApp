import { ILocation } from 'src/core/types/location.interface';

export interface ILocationState {
  isLoading: boolean;
  location: ILocation | null;
  error: string | null;
}

export const locationInitialState: ILocationState = {
  isLoading: false,
  location: null,
  error: null
};
