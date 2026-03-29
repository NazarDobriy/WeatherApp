import { IForecast } from '@core/types/forecast.interface';
import { IWeather } from '@core/types/weather.interface';
import { deepFreeze } from '@utils/index';

export interface IWeatherState {
  weather: {
    isLoading: boolean;
    isUpdateLoading: boolean;
    data: IWeather | null;
    error: string | null;
  };
  forecasts: {
    isLoading: boolean;
    isUpdateLoading: boolean;
    data: IForecast[];
    error: string | null;
  };
}

export const weatherInitialState: IWeatherState = deepFreeze<IWeatherState>({
  weather: {
    isLoading: false,
    isUpdateLoading: false,
    data: null,
    error: null,
  },
  forecasts: {
    isLoading: false,
    isUpdateLoading: false,
    data: [],
    error: null,
  },
});
