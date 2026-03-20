import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { MOCK_LOCATION } from '@tests/constants/test.constants';

@Injectable()
export class MockLocationStoreService {
  readonly location$ = of(MOCK_LOCATION);
  readonly isFavoriteLocation$ = of(true);
}
