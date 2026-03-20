import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { LocationsStoreService } from './locations-store.service';
import { MOCK_DROPDOWN, MOCK_LOCATION } from '@tests/constants/test.constants';
import { ILocation } from '@core/types/location.interface';
import * as LocationsActions from '@pages/home/store/locations/actions';
import * as LocationsSelectors from '@pages/home/store/locations/selectors';
import { ILocationsState } from '@pages/home/store/locations/state';

describe('LocationsStoreService', () => {
  let service: LocationsStoreService;
  let store: MockStore<ILocationsState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        LocationsStoreService,
        provideMockStore({
          selectors: [
            { selector: LocationsSelectors.selectLocations, value: [MOCK_LOCATION] },
            { selector: LocationsSelectors.selectLastSearchedQueryLocations, value: 'Berlin' },
            { selector: LocationsSelectors.selectDropdownLocations, value: MOCK_DROPDOWN },
            { selector: LocationsSelectors.selectFailureLocations, value: 'Some error' },
          ],
        }),
      ],
    });

    store = TestBed.inject<MockStore<ILocationsState>>(MockStore);
    service = TestBed.inject(LocationsStoreService);

    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('check locations$', (done: DoneFn) => {
    service.locations$.subscribe({
      next: (locations: ILocation[]) => {
        expect(locations).toEqual([MOCK_LOCATION]);
        done();
      },
    });
  });

  it('check lastSearchedQueryLocations$', (done: DoneFn) => {
    service.lastSearchedQueryLocations$.subscribe({
      next: (query: string | null) => {
        expect(query).toBe('Berlin');
        done();
      },
    });
  });

  it('check locationsFailure$', (done: DoneFn) => {
    service.locationsFailure$.subscribe({
      next: (error: string | null) => {
        expect(error).toBe('Some error');
        done();
      },
    });
  });

  it('check dropdown$', (done: DoneFn) => {
    service.dropdown$.subscribe({
      next: (response: Omit<ILocationsState, 'error'>) => {
        expect(response).toEqual(MOCK_DROPDOWN);
        done();
      },
    });
  });

  it('check dispatchLocations', () => {
    const query = 'London';
    service.dispatchLocations(query);
    expect(store.dispatch).toHaveBeenCalledWith(LocationsActions.getLocations({ query }));
  });

  it('check dispatchClearLocations', () => {
    service.dispatchClearLocations();
    expect(store.dispatch).toHaveBeenCalledWith(LocationsActions.clearLocations());
  });
});
