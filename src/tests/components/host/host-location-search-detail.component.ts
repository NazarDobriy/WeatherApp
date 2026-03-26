import { Component, signal } from '@angular/core';

import { LocationSearchDetailComponent } from '@pages/home/components/location-search/components/location-search-detail/location-search-detail.component';
import { MOCK_LOCATION } from '@tests/constants/test.constants';
import { ILocation } from '@core/types/location.interface';

@Component({
  imports: [LocationSearchDetailComponent],
  template: `<app-location-search-detail [location]="location()"></app-location-search-detail>`,
})
export class HostLocationSearchDetailComponent {
  readonly location = signal<ILocation>(MOCK_LOCATION);
}
