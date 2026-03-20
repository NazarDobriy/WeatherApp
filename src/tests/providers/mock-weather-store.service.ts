import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { MOCK_FORECAST, MOCK_WEATHER } from '@tests/constants/test.constants';

@Injectable()
export class MockWeatherStoreService {
  readonly weather$ = of(MOCK_WEATHER);
  readonly forecasts$ = of([MOCK_FORECAST]);
}
