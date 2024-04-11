import { IFavoritesState } from "src/core/store/favorites/state";
import { ILocationState } from "src/core/store/location/state";
import { ILocationsState } from "src/pages/home/store/locations/state";
import { IWeatherState } from "src/pages/home/store/weather/state";

export interface IAppState {
  location: ILocationState,
  locations: ILocationsState;
  weather: IWeatherState;
  favorites: IFavoritesState;
}
