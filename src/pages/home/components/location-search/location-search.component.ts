import { ChangeDetectionStrategy, Component, computed, DestroyRef, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';

import { LocationsStoreService } from '@pages/home/providers/locations-store.service';
import { LocationStoreService } from '@core/providers/location-store.service';
import { ILocation } from '@core/types/location.interface';
import {
  LocationSearchFormService,
} from '@pages/home/components/location-search/providers/location-search-form.service';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  standalone: true,
  imports: [
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
  providers: [LocationSearchFormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationSearchComponent implements OnInit {
  readonly locations$ = this.locationsStore.locations$;
  readonly isLoading$ = this.locationsStore.isLoadingLocations$;
  readonly matcher: ErrorStateMatcher = {
    isErrorState: (control: FormControl): boolean => {
      return control?.invalid && (control?.dirty || control?.touched);
    }
  };
  private readonly searchControl = this.locationSearchFormService.searchControl;
  readonly searchInput = toSignal(this.searchControl.valueChanges, { initialValue: this.searchControl.value });
  readonly requiredError = computed<boolean>(() => this.searchControl.hasError('required'));
  readonly patternError  = computed<boolean>(() => this.searchControl.hasError('pattern'));
  private selectedOption: string | null = null;

  constructor(
    public locationSearchFormService: LocationSearchFormService,
    private locationsStore: LocationsStoreService,
    private locationStore: LocationStoreService,
    private destroyRef: DestroyRef,
  ) { }

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
      takeUntilDestroyed(this.destroyRef),
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
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (location: ILocation) => {
        this.searchControl?.setValue(location.LocalizedName, { emitEvent: false });
      },
    });
  }

}
