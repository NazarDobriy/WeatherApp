import { ILocationsState } from "src/pages/home/store/locations/state";
import { IWeatherState } from "src/pages/home/store/weather/state";

export interface IAppState {
  locations: ILocationsState;
  weather: IWeatherState;
}
