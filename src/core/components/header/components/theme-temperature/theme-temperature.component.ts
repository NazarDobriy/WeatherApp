import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { ThemeStoreService } from '@core/providers/theme-store.service';

@Component({
  selector: 'app-theme-temperature',
  templateUrl: './theme-temperature.component.html',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeTemperatureComponent {
  isCelsius$ = this.themeStore.isCelsius$;

  constructor(private themeStore: ThemeStoreService) {}

  changeThemeTemperature(): void {
    this.themeStore.dispatchTemperature();
  }
}
