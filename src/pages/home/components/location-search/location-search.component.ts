import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { LocationsStoreService } from '@pages/home/providers/locations-store.service';
import { LocationStoreService } from '@core/providers/location-store.service';
import { ILocation } from '@core/types/location.interface';
import { lettersWithSpacesValidator } from '@core/validators/validators.constants';
import { ILocationSearchForm } from '@pages/home/components/location-search/types/location-search.interface';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class LocationSearchComponent implements OnInit, OnDestroy {
  formGroup: FormGroup<ILocationSearchForm>;
  readonly locations$ = this.locationsStore.locations$;
  readonly isLoading$ = this.locationsStore.isLoadingLocations$;
  readonly matcher: ErrorStateMatcher = {
    isErrorState: (control: FormControl): boolean => {
      return control?.invalid && (control?.dirty || control?.touched);
    }
  };
  private selectedOption: string | null = null;
  private readonly destroy$ = new Subject<void>();

  get searchControl(): FormControl<string> {
    return this.formGroup.get<string>('searchInput') as FormControl<string>;
  }

  get searchInput(): string {
    return this.searchControl?.value;
  }

  get requiredError(): boolean | undefined {
    return this.searchControl?.hasError('required');
  }

  get patternError(): boolean | undefined {
    return this.searchControl?.hasError('pattern');
  }

  constructor(
    private formBuilder: FormBuilder,
    private locationsStore: LocationsStoreService,
    private locationStore: LocationStoreService
  ) {
    this.formGroup = this.formBuilder.group<ILocationSearchForm>({
      searchInput: this.formBuilder.control('', {
        validators: [Validators.required, Validators.pattern(lettersWithSpacesValidator)],
        nonNullable: true,
      }),
    });
  }

  ngOnInit(): void {
    this.handleInputChanges();
    this.handleLocation();
  }

  clearSearchInput(): void {
    this.searchControl?.setValue('');
    this.locationsStore.dispatchClearLocations();
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectedOption = event.option.value;
  }

  onSelectionChange(location: ILocation): void {
    this.locationStore.dispatchLocationChange(location);
  }

  private handleInputChanges(): void {
    this.searchControl?.valueChanges.pipe(
      debounceTime(700),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    ).subscribe({
      next: (text: string) => {
        if (!text) {
          this.locationsStore.dispatchClearLocations();
          return;
        }

        if (this.searchControl.valid) {
          const current = text.toLowerCase();
          const selected = this.selectedOption?.toLowerCase();

          if (!selected || selected !== current) {
            this.locationsStore.dispatchLocations(text);
          }
        }
      },
    });
  }

  private handleLocation(): void {
    this.locationStore.location$.pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: (location: ILocation) => {
        this.searchControl?.setValue(location.LocalizedName, { emitEvent: false });
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
