import { IGeoLocation } from "@core/types/geo-location";

export interface INavigationState {
  coords: IGeoLocation | null;
  error: string | null;
}

export const navigationInitialState: INavigationState = Object.freeze({
  coords: null,
  error: null,
});
