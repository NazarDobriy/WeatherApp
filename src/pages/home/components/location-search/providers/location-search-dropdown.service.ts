import { Injectable } from '@angular/core';
import { combineLatest, map, startWith } from "rxjs";

import {
  LocationSearchDropdownType,
} from "@pages/home/components/location-search/types/location-search-dropdown.type";
import { LocationSearchFormService } from "@pages/home/components/location-search/providers/location-search-form.service";
import { LocationsStoreService } from "@pages/home/providers/locations-store.service";

@Injectable()
export class LocationSearchDropdownService {
  private readonly searchControl = this.locationSearchFormService.searchControl;

  readonly dropdownState$ = combineLatest([
    this.locationsStore.dropdown$,
    this.searchControl.valueChanges.pipe(startWith(this.searchControl.value)),
    this.searchControl.statusChanges.pipe(startWith(this.searchControl.status)),
  ]).pipe(
    map(([{ locations, isLoading, lastSearchedQuery }, query, status]): LocationSearchDropdownType => {
      if (status !== 'VALID' || !query || lastSearchedQuery !== query) {
        return 'idle';
      }

      if (isLoading) {
        return 'loading';
      }

      if (locations.length === 0) {
        return 'empty';
      }

      return 'outcome';
    })
  );

  constructor(
    private locationsStore: LocationsStoreService,
    private locationSearchFormService: LocationSearchFormService
  ) { }
}
