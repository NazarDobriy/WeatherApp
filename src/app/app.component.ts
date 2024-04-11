import { Component, OnInit } from '@angular/core';

import { KyivGeoLocation } from 'src/core/consts/location.const';
import { ErrorHandlerService } from 'src/core/providers/error-handler.service';
import { LocationStoreService } from 'src/core/providers/location-store.service';
import { NgRxLocalStorageService } from 'src/core/providers/ng-rx-local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private locationStore: LocationStoreService,
    private errorHandlerService: ErrorHandlerService,
    private ngRxLocalStorage: NgRxLocalStorageService
  ) {}

  ngOnInit(): void {
    this.handleGeoPosition();
    this.ngRxLocalStorage.launch();
    this.errorHandlerService.handleError$(this.locationStore.locationFailure$);
  }

  private handleGeoPosition(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.locationStore.dispatchLocation(position.coords),
        (error) => {
          this.errorHandlerService.handleError(error.message);
          this.locationStore.dispatchLocation(KyivGeoLocation);
        }
      );
    }
  }
}
