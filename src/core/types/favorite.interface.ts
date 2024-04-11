import { ITemperature } from './temperature.interface';

export interface IFavorite {
  id: string;
  name: string;
  weatherText: string;
  temperature: ITemperature;
}
