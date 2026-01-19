import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as LocationsActions from '@pages/home/store/locations/actions';
import * as LocationsSelectors from '@pages/home/store/locations/selectors';
import { ILocationsState } from '@pages/home/store/locations/state';

@Injectable()
export class LocationsStoreService {
  readonly locations$ = this.store.select(LocationsSelectors.selectLocations);
  readonly locationsFailure$ = this.store.select(LocationsSelectors.selectFailureLocations);
  readonly isLoadingLocations$ = this.store.select(LocationsSelectors.selectIsLoadingLocations);
  readonly lastSearchedQueryLocations$ = this.store.select(LocationsSelectors.selectLastSearchedQueryLocations);

  constructor(private store: Store<ILocationsState>) {}

  dispatchLocations(query: string): void {
    this.store.dispatch(LocationsActions.getLocations({ query }));
  }

  dispatchClearLocations(): void {
    this.store.dispatch(LocationsActions.clearLocations());
  }
}
