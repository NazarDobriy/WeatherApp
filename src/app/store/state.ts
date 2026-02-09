import { RouterState } from "@angular/router";

import { IFavoritesState } from "@core/store/favorites/state";
import { ILocationState } from "@core/store/location/state";
import { IThemeState } from "@core/store/theme/state";
import { ILocationsState } from "@pages/home/store/locations/state";
import { IWeatherState } from "@pages/home/store/weather/state";

export interface IAppState {
  router: RouterState,
  location: ILocationState,
  locations: ILocationsState;
  weather: IWeatherState;
  favorites: IFavoritesState;
  theme: IThemeState;
}
