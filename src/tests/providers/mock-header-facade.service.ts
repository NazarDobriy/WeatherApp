import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class MockHeaderFacadeService {
  readonly isHideBlock$ = of(false);
}
