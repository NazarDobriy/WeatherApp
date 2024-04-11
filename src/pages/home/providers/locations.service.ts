import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ILocation } from '../../../core/types/location.interface';

@Injectable()
export class LocationsService {
  constructor(private http: HttpClient) {}

  getLocations(query: string): Observable<ILocation[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<ILocation[]>('/locations/v1/cities/autocomplete', {
      params
    });
  }
}
