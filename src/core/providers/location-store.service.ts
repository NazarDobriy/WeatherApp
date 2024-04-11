import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as LocationActions from '../store/location/actions';
import * as LocationSelectors from '../store/location/selectors';
import { IGeoLocation } from '../types/geo-location';

@Injectable()
export class LocationStoreService {
  location$ = this.store.select(LocationSelectors.selectLocation);
  locationFailure$ = this.store.select(LocationSelectors.selectFailureLocation);
  isLoadingLocation$ = this.store.select(LocationSelectors.selectIsLoadingLocation);

  constructor(private store: Store) {}

  dispatchLocation(geoPosition: IGeoLocation): void {
    this.store.dispatch(LocationActions.getLocation({ geoPosition }));
  }
}
