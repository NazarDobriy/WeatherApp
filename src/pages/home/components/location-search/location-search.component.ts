import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  skip,
  takeUntil
} from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { LocationsStoreService } from '@pages/home/providers/locations-store.service';
import { LocationStoreService } from '@core/providers/location-store.service';
import { ILocation } from '@core/types/location.interface';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html'
})
export class LocationSearchComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  locations$ = this.locationsStore.locations$;
  isLoading$ = this.locationsStore.isLoadingLocations$;
  matcher: ErrorStateMatcher = {
    isErrorState: (control: FormControl): boolean => {
      return control.invalid && (control.dirty || control.touched);
    }
  };
  private destroy$ = new Subject<void>();
  private selectedOption: string | null = null;

  get searchInput(): string {
    return this.formGroup.get('searchInput')?.value;
  }

  get requiredError(): boolean | undefined {
    return this.formGroup.get('searchInput')?.hasError('required');
  }

  get patternError(): boolean | undefined {
    return this.formGroup.get('searchInput')?.hasError('pattern');
  }

  constructor(
    private formBuilder: FormBuilder,
    private locationsStore: LocationsStoreService,
    private locationStore: LocationStoreService
  ) {
    this.formGroup = this.formBuilder.group({
      searchInput: [
        '',
        {
          validators: [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]
        }
      ]
    });
  }

  ngOnInit(): void {
    this.handleInputChanges();
    this.handleLocation();
  }

  clearSearchInput(): void {
    this.formGroup.get('searchInput')?.setValue('');
    this.locationsStore.dispatchClearLocations();
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectedOption = event.option.value;
  }

  onSelectionChange(location: ILocation): void {
    this.locationStore.dispatchLocationChange(location);
  }

  private handleInputChanges(): void {
    this.formGroup
      .get('searchInput')
      ?.valueChanges.pipe(
        skip(1),
        debounceTime(700),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((text: string) => {
        if (this.formGroup.get('searchInput')?.valid) {
          if (
            !this.selectedOption ||
            this.selectedOption.toLowerCase() !== text.toLowerCase()
          ) {
            this.locationsStore.dispatchLocations(text);
          }
        }

        if (!text.length) {
          this.locationsStore.dispatchClearLocations();
        }
      });
  }

  private handleLocation(): void {
    this.locationStore.location$
      .pipe(takeUntil(this.destroy$))
      .subscribe((location) => {
        if (location) {
          this.formGroup.get('searchInput')?.setValue(location.LocalizedName);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
