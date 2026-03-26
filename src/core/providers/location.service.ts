import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ILocation } from '@core/types/location.interface';
import { IGeoLocation } from '@core/types/geo-location';
import { ILocationApi } from '@core/types/location-api.interface';
import { locationMapper } from '@core/mappers/location.mapper';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getLocation(getPosition: IGeoLocation): Observable<ILocation> {
    const params = new HttpParams().set('q', `${getPosition.latitude},${getPosition.longitude}`);
    return this.http
      .get<ILocationApi>('/locations/v1/cities/geoposition/search', {
        params,
      })
      .pipe(map((location: ILocationApi) => locationMapper(location)));
  }
}
