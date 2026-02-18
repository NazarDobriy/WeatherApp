import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as LocationActions from '@core/store/location/actions';
import * as LocationSelectors from '@core/store/location/selectors';
import { ILocation } from '@core/types/location.interface';
import { ILocationState } from '@core/store/location/state';

@Injectable({
  providedIn: 'root',
})
export class LocationStoreService {
  readonly location$ = this.store.select(LocationSelectors.selectLocation);
  readonly locationFailure$ = this.store.select(LocationSelectors.selectFailureLocation);
  readonly isLoadingLocation$ = this.store.select(LocationSelectors.selectIsLoadingLocation);
  readonly isFavoriteLocation$ = this.store.select(LocationSelectors.isFavoriteLocation);

  constructor(private store: Store<ILocationState>) {}

  dispatchResetLocation(): void {
    this.store.dispatch(LocationActions.resetLocation());
  }

  dispatchLocationChange(location: ILocation): void {
    this.store.dispatch(LocationActions.changeLocation({ location }));
  }
}
