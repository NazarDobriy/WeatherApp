import { Injectable } from '@angular/core';
import { Observable, combineLatest, map, of } from 'rxjs';
import { Router } from "@angular/router";

import { IWeather } from '@core/types/weather.interface';
import { WeatherService } from '@core/providers/weather.service';
import { IFavoriteDetailedInfo, IFavoriteShortInfo } from '@core/types/favorite.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {

  constructor(
    private router: Router,
    private weatherService: WeatherService,
  ) {}

  getDetailedFavorites(shortFavorites: IFavoriteShortInfo[]): Observable<IFavoriteDetailedInfo[]> {
    if (shortFavorites.length === 0) {
      return of([]);
    }

    const favoriteWeatherStreams = shortFavorites.map((shortFavorite: IFavoriteShortInfo) => {
      return this.getDetailedFavorite(shortFavorite);
    });

    return combineLatest(favoriteWeatherStreams);
  }

  getDetailedFavorite(shortFavorite: IFavoriteShortInfo): Observable<IFavoriteDetailedInfo> {
    return this.weatherService.getWeather(shortFavorite.id).pipe(
      map((weather: IWeather) => {
        return {
          ...shortFavorite,
          ...weather,
        };
      }),
    );
  }

  clearDialogRouteParams(): void {
    this.router.navigate([], {
      queryParams: { action: null },
      queryParamsHandling: 'merge',
    });
  }

}
