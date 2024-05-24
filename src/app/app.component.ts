import { Component, OnInit } from '@angular/core';

import { KyivGeoLocation } from 'src/core/consts/location.const';
import { LocationStoreService } from 'src/core/providers/location-store.service';
import { NgRxLocalStorageService } from 'src/core/providers/ng-rx-local-storage.service';
import { SnackBarService } from 'src/core/providers/snack-bar.service';
import { ThemeStoreService } from 'src/core/providers/theme-store.service';

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
