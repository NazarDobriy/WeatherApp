import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ILocationSearchForm } from '@pages/home/components/location-search/types/location-search.interface';

@Injectable()
export class MockLocationSearchFormService {
  readonly formGroup = new FormGroup<ILocationSearchForm>({
    searchInput: new FormControl('Berlin', { nonNullable: true }),
  });
  readonly searchControl = this.formGroup.controls.searchInput;
}
