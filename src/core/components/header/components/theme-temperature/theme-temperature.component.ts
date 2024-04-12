import { Component } from '@angular/core';

import { ThemeStoreService } from 'src/core/providers/theme-store.service';

@Component({
  selector: 'app-theme-temperature',
  templateUrl: './theme-temperature.component.html'
})
export class ThemeTemperatureComponent {
  isCelsius$ = this.themeStore.isCelsius$;

  constructor(private themeStore: ThemeStoreService) {}

  changeThemeTemperature(): void {
    this.themeStore.dispatchTemperature();
  }
}
