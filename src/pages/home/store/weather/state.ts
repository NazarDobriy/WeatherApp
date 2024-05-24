import { IForecast } from '@pages/home/types/forecast.interface';
import { IWeather } from '@pages/home/types/weather.interface';

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

export const weatherInitialState: IWeatherState = {
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
};
