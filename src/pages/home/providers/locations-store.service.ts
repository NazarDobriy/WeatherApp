import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as LocationsActions from '@pages/home/store/locations/actions';
import * as LocationsSelectors from '@pages/home/store/locations/selectors';

@Injectable()
export class LocationsStoreService {
  locations$ = this.store.select(LocationsSelectors.selectLocations);
  locationsFailure$ = this.store.select(LocationsSelectors.selectFailureLocations);
  isLoadingLocations$ = this.store.select(LocationsSelectors.selectIsLoadingLocations);

  constructor(private store: Store) {}

  dispatchLocations(query: string): void {
    this.store.dispatch(LocationsActions.getLocations({ query }));
  }

  dispatchClearLocations(): void {
    this.store.dispatch(LocationsActions.clearLocations());
  }
}
