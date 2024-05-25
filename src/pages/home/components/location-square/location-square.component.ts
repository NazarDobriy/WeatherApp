import { Component } from '@angular/core';

import { ThemeStoreService } from '@core/providers/theme-store.service';

@Component({
  selector: 'app-location-square',
  templateUrl: './location-square.component.html'
})
export class LocationSquareComponent {
  isDarkMode$ = this.themeStore.isDarkMode$;

  constructor(private themeStore: ThemeStoreService) {}

}
