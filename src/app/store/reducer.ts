import { ActionReducerMap } from "@ngrx/store";

import { IAppState } from "./state";
import { locationsReducer } from "src/pages/home/store/locations/reducer";
import { weatherReducer } from "src/pages/home/store/weather/reducer";
import { favoritesReducer } from "src/core/store/favorites/reducer";
import { locationReducer } from "src/core/store/location/reducer";

export const reducers: ActionReducerMap<IAppState> = {
  location: locationReducer,
  locations: locationsReducer,
  weather: weatherReducer,
  favorites: favoritesReducer
};
