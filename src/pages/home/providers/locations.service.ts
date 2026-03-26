import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ILocation } from '@core/types/location.interface';
import { ILocationApi } from '@core/types/location-api.interface';
import { locationsMapper } from '@core/mappers/locations.mapper';

@Injectable()
export class LocationsService {
  constructor(private http: HttpClient) {}

  getLocations(query: string): Observable<ILocation[]> {
    const params = new HttpParams().set('q', query);
    return this.http
      .get<ILocationApi[]>('/locations/v1/cities/autocomplete', {
        params,
      })
      .pipe(map((locations: ILocationApi[]) => locationsMapper(locations)));
  }
}
