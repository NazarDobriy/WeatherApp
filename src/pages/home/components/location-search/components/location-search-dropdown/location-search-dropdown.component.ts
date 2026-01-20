import { Component, ViewChild } from '@angular/core';
import { AsyncPipe } from "@angular/common";
import { MatOption, MatAutocomplete } from "@angular/material/autocomplete";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

import {
  LocationSearchDropdownService,
} from "@pages/home/components/location-search/components/location-search-dropdown/providers/location-search-dropdown.service";
import { LocationsStoreService } from "@pages/home/providers/locations-store.service";
import { LocationStoreService } from "@core/providers/location-store.service";
import { ILocation } from "@core/types/location.interface";

@Component({
  selector: 'app-location-search-dropdown',
  imports: [
    AsyncPipe,
    MatOption,
    MatAutocomplete,
    MatProgressSpinner,
  ],
  templateUrl: './location-search-dropdown.component.html',
  providers: [LocationSearchDropdownService],
})
export class LocationSearchDropdownComponent {
  @ViewChild('auto') autocomplete!: MatAutocomplete;

  readonly locations$ = this.locationsStore.locations$;
  readonly lastSearchedQuery$ = this.locationsStore.lastSearchedQueryLocations$;
  readonly dropdownState$ = this.locationSearchDropdownService.dropdownState$;

  constructor(
    private locationStore: LocationStoreService,
    private locationsStore: LocationsStoreService,
    private locationSearchDropdownService: LocationSearchDropdownService,
  ) { }

  onSelectionChange(location: ILocation): void {
    this.locationStore.dispatchLocationChange(location);
  }
}
