import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { MOCK_DROPDOWN, MOCK_LOCATION } from '@tests/constants/test.constants';

@Injectable()
export class MockLocationsStoreService {
  readonly locations$ = of([MOCK_LOCATION]);
  readonly dropdown$ = of(MOCK_DROPDOWN);
  readonly lastSearchedQueryLocations$ = of('Poltava');
}
