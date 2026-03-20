import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { ThemeType } from '@core/types/theme.type';

@Injectable()
export class MockThemeStoreService {
  readonly theme$ = of('auto');
  readonly isCelsius$ = of(true);
  readonly isChartRepresentation$ = of(false);

  dispatchSetThemeMode(theme: ThemeType): void {}

  dispatchSetTemperature(isCelsius: boolean): void {}

  dispatchSetDailyRepresentation(isChartRepresentation: boolean): void {}
}
