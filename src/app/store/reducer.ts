import { ActionReducerMap } from "@ngrx/store";

import { IAppState } from "./state";
import { locationsReducer } from "@pages/home/store/locations/reducer";
import { weatherReducer } from "@pages/home/store/weather/reducer";
import { favoritesReducer } from "@core/store/favorites/reducer";
import { locationReducer } from "@core/store/location/reducer";
import { themeReducer } from "@core/store/theme/reducer";

export const reducers: ActionReducerMap<IAppState> = {
  location: locationReducer,
  locations: locationsReducer,
  weather: weatherReducer,
  favorites: favoritesReducer,
  theme: themeReducer
};
