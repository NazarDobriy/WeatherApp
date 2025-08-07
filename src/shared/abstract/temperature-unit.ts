import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ThemeStoreService } from '@core/providers/theme-store.service';

export abstract class TemperatureUnit {
  protected isCelsius = true;
  protected readonly themeStore = inject(ThemeStoreService);

  protected constructor() {
    this.themeStore.isCelsius$.pipe(
      takeUntilDestroyed(),
    ).subscribe(isCelsius => this.isCelsius = isCelsius);
  }
}
