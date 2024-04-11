import { Component, OnInit } from '@angular/core';

import { KyivGeoLocation } from 'src/core/consts/location.const';
import { ErrorHandlerService } from 'src/core/providers/error-handler.service';
import { LocationStoreService } from 'src/core/providers/location-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private locationStore: LocationStoreService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.handleGeoPosition();
    this.errorHandlerService.handleError$(this.locationStore.locationFailure$);
  }

  private handleGeoPosition(): void {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(
        (position) => this.locationStore.dispatchLocation(position.coords),
        (error) => {
          this.errorHandlerService.handleError(error.message);
          this.locationStore.dispatchLocation(KyivGeoLocation);
        }
      );
    }
  }
}
