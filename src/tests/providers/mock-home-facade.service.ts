import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class MockHomeFacadeService {
  readonly isLoading$ = of(false);
}
