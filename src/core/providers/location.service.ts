import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ILocation } from '@core/types/location.interface';
import { IGeoLocation } from '@core/types/geo-location';

@Injectable()
export class LocationService {
  constructor(private http: HttpClient) {}

  getLocation(getPosition: IGeoLocation): Observable<ILocation> {
    const params = new HttpParams().set(
      'q',
      `${getPosition.latitude},${getPosition.longitude}`
    );
    return this.http.get<ILocation>(
      '/locations/v1/cities/geoposition/search',
      { params }
    );
  }
}
