import { Component, OnInit } from '@angular/core';

import { KyivGeoLocation } from '@core/consts/location.const';
import { LocationStoreService } from '@core/providers/location-store.service';
import { NgRxLocalStorageService } from '@core/providers/ng-rx-local-storage.service';
import { SnackBarService } from '@core/providers/snack-bar.service';
import { ThemeStoreService } from '@core/providers/theme-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isDarkMode$ = this.themeStore.isDarkMode$;

  constructor(
    private themeStore: ThemeStoreService,
    private snackBarService: SnackBarService,
    private locationStore: LocationStoreService,
    private ngRxLocalStorage: NgRxLocalStorageService
  ) {}

  ngOnInit(): void {
    this.handleGeoPosition();
    this.ngRxLocalStorage.initialization();
  }

  private handleGeoPosition(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.locationStore.dispatchLocation(position.coords),
        (error) => {
          this.snackBarService.open(error.message, 'X');
          this.locationStore.dispatchLocation(KyivGeoLocation);
        }
      );
    }
  }
}
