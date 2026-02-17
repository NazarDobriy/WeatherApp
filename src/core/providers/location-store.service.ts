import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as LocationActions from '@core/store/location/actions';
import * as LocationSelectors from '@core/store/location/selectors';
import { ILocation } from '@core/types/location.interface';
import { ILocationState } from '@core/store/location/state';
import { filterDefined } from '@utils/index';

@Injectable({
  providedIn: 'root',
})
export class LocationStoreService {
  readonly location$ = this.store.select(LocationSelectors.selectLocation).pipe(filterDefined);
  readonly locationFailure$ = this.store.select(LocationSelectors.selectFailureLocation);
  readonly isLoadingLocation$ = this.store.select(LocationSelectors.selectIsLoadingLocation);

  constructor(private store: Store<ILocationState>) {}

  dispatchLocation(): void {
    this.store.dispatch(LocationActions.getLocation());
  }

  dispatchLocationChange(location: ILocation): void {
    this.store.dispatch(LocationActions.changeLocation({ location }));
  }
}
