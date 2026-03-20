import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class MockLocationSearchDropdownService {
  readonly dropdownState$ = of('idle');
}
