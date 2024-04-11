import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { LocationsStoreService } from '../../providers/locations-store.service';
import { SnackBarService } from '../../../../core/providers/snack-bar.service';
import { WeatherStoreService } from '../../providers/weather-store.service';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html'
})
export class LocationSearchComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  locations$ = this.locationsStore.locations$;
  isLoading$ = this.locationsStore.isLoadingLocations$;
  error$ = this.locationsStore.locationsFailure$;
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
    private weatherStore: WeatherStoreService,
    private snackBarService: SnackBarService
  ) {
    this.formGroup = this.formBuilder.group({
      searchInput: [
        '',
        { validators: [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)] }
      ]
    });
  }

  ngOnInit(): void {
    this.handleInputChanges();
    this.handleError();
  }

  clearSearchInput(): void {
    this.formGroup.get('searchInput')?.setValue('');
    this.locationsStore.dispatchClearLocations();
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const key = event.option.id;
    this.selectedOption = event.option.value;
    this.weatherStore.dispatchWeather(key);
    this.weatherStore.dispatchForecasts(key);
  }

  private handleError(): void {
    this.error$.pipe(takeUntil(this.destroy$)).subscribe((error) => {
      if (error) {
        this.snackBarService.open(error, 'X');
      }
    });
  }

  private handleInputChanges(): void {
    this.formGroup
      .get('searchInput')
      ?.valueChanges.pipe(
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
