import { inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ThemeStoreService } from '@core/providers/theme-store.service';

export abstract class TemperatureUnit {
  protected readonly isCelsius = signal<boolean>(true);
  protected readonly themeStore = inject(ThemeStoreService);

  protected constructor() {
    this.themeStore.isCelsius$.pipe(
      takeUntilDestroyed(),
    ).subscribe({
      next: (isCelsius: boolean) => this.isCelsius.set(isCelsius),
    });
  }
}
