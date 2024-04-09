import { ActionReducerMap } from "@ngrx/store";

import { IAppState } from "./state";
import { locationsReducer } from "src/pages/home/store/locations/reducer";

export const reducers: ActionReducerMap<IAppState> = {
  locations: locationsReducer
};
