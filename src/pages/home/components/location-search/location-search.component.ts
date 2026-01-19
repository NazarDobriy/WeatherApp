import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { debounceTime, distinctUntilChanged, filter, map, startWith } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material/autocomplete';
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
  providers: [
    LocationSearchFormService,
    {
      provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
      useValue: { overlayPanelClass: 'location-autocomplete' },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationSearchComponent implements OnInit {
  readonly locations$ = this.locationsStore.locations$;
  readonly isLoading$ = this.locationsStore.isLoadingLocations$;
  readonly lastSearchedQuery$ = this.locationsStore.lastSearchedQueryLocations$;
  readonly matcher: ErrorStateMatcher = {
    isErrorState: (control: FormControl): boolean => {
      return control?.invalid && (control?.dirty || control?.touched);
    }
  };
  readonly searchControl = this.locationSearchFormService.searchControl;
  readonly searchInput = toSignal<string>(
    this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
    ),
  );
  readonly requiredError = toSignal<boolean>(
    this.searchControl.statusChanges.pipe(
      startWith(this.searchControl.status),
      map(() => this.searchControl.hasError('required'))
    )
  );
  readonly patternError = toSignal<boolean>(
    this.searchControl.statusChanges.pipe(
      startWith(this.searchControl.status),
      map(() => this.searchControl.hasError('pattern'))
    )
  );

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
    this.searchControl?.markAsTouched();
    this.searchControl?.setValue('');
    this.locationsStore.dispatchClearLocations();
  }

  onSelectionChange(location: ILocation): void {
    this.locationStore.dispatchLocationChange(location);
  }

  private handleInputChanges(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(700),
      filter((text: string): text is string => true),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((text: string) => {
      if (!text) {
        this.locationsStore.dispatchClearLocations();
        return;
      }

      if (this.searchControl.valid) {
        this.locationsStore.dispatchLocations(text);
      }
    });
  }

  private handleLocation(): void {
    this.locationStore.location$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (location: ILocation) => {
        this.searchControl?.setValue(location.LocalizedName);
      },
    });
  }

}
