import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as LocationActions from '@core/store/location/actions';
import * as LocationSelectors from '@core/store/location/selectors';
import { IGeoLocation } from '@core/types/geo-location';
import { ILocation } from '@core/types/location.interface';

@Injectable()
export class LocationStoreService {
  location$ = this.store.select(LocationSelectors.selectLocation);
  locationFailure$ = this.store.select(LocationSelectors.selectFailureLocation);
  isLoadingLocation$ = this.store.select(LocationSelectors.selectIsLoadingLocation);

  constructor(private store: Store) {}

  dispatchLocation(geoPosition: IGeoLocation): void {
    this.store.dispatch(LocationActions.getLocation({ geoPosition }));
  }

  dispatchLocationChange(location: ILocation): void {
    this.store.dispatch(LocationActions.changeLocation({ location }));
  }
}
