import { IForecast } from '@core/types/forecast.interface';
import { IWeather } from '@core/types/weather.interface';
import { deepFreeze } from "@utils/index";

export interface IWeatherState {
  weather: {
    isLoading: boolean;
    data: IWeather | null;
    error: string | null;
  };
  forecasts: {
    isLoading: boolean;
    data: IForecast[];
    error: string | null;
  };
}

export const weatherInitialState: IWeatherState = deepFreeze<IWeatherState>({
  weather: {
    isLoading: false,
    data: null,
    error: null
  },
  forecasts: {
    isLoading: false,
    data: [],
    error: null
  }
});
