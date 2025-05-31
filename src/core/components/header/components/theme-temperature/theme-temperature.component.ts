import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';

import { ThemeStoreService } from '@core/providers/theme-store.service';

@Component({
  selector: 'app-theme-temperature',
  templateUrl: './theme-temperature.component.html',
  standalone: true,
  imports: [NgIf, AsyncPipe],
})
export class ThemeTemperatureComponent {
  isCelsius$ = this.themeStore.isCelsius$;

  constructor(private themeStore: ThemeStoreService) {}

  changeThemeTemperature(): void {
    this.themeStore.dispatchTemperature();
  }
}
