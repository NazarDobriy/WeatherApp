import { Injectable } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';

import { IWeather } from '@pages/home/types/weather.interface';
import { WeatherService } from '@pages/home/providers/weather.service';
import { IFavoriteDetailedInfo, IFavoriteShortInfo } from '@core/types/favorite.interface';

@Injectable()
export class FavoritesService {

  constructor(private weatherService: WeatherService) {}

  getDetailedFavorites(shortFavorites: IFavoriteShortInfo[]): Observable<IFavoriteDetailedInfo[]> {
    const favoriteWeatherStreams = shortFavorites.map((shortFavorite: IFavoriteShortInfo) => {
      return this.weatherService.getWeather(shortFavorite.id).pipe(
        map((weather: IWeather) => {
          return {
            ...shortFavorite,
            ...weather,
          };
        }),
      );
    });

    return combineLatest(favoriteWeatherStreams);
  }
}
