import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ILocationSearchForm } from '@pages/home/components/location-search/types/location-search.interface';
import { lettersWithSpacesValidator } from '@core/validators/validators.constants';

@Injectable()
export class LocationSearchFormService {
  formGroup: FormGroup<ILocationSearchForm>;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group<ILocationSearchForm>({
      searchInput: this.fb.control<string>('', {
        validators: [Validators.required, Validators.pattern(lettersWithSpacesValidator)],
        nonNullable: true,
      }),
    });
  }
}
