import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, MatOption } from '@angular/material/core';
import { debounceTime, distinctUntilChanged, filter, map, startWith } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
  MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';

import { filterDefined } from '@utils/index';
import { ILocation } from '@core/types/location.interface';
import { LocationStoreService } from '@core/providers/location-store.service';
import { LocationsStoreService } from '@pages/home/providers/locations-store.service';
import { LocationSearchFormService } from '@pages/home/components/location-search/providers/location-search-form.service';
import { LocationSearchDropdownService } from '@pages/home/components/location-search/providers/location-search-dropdown.service';
import { LocationSearchDetailComponent } from '@pages/home/components/location-search/components/location-search-detail/location-search-detail.component';

@Component({
  selector: 'app-location-search',
  imports: [
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinner,
    MatAutocompleteTrigger,
    MatAutocomplete,
    AsyncPipe,
    MatOption,
    LocationSearchDetailComponent,
  ],
  templateUrl: './location-search.component.html',
  providers: [
    LocationSearchFormService,
    LocationSearchDropdownService,
    {
      provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
      useValue: { overlayPanelClass: 'location-autocomplete' },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationSearchComponent implements OnInit {
  readonly matcher: ErrorStateMatcher = {
    isErrorState: (control: FormControl): boolean => {
      return control.invalid && (control.dirty || control.touched);
    },
  };
  private readonly searchControl = this.locationSearchFormService.searchControl;
  readonly searchInput = toSignal<string>(
    this.searchControl.valueChanges.pipe(startWith(this.searchControl.value)),
  );
  readonly requiredError = toSignal<boolean>(
    this.searchControl.statusChanges.pipe(
      startWith(this.searchControl.status),
      map(() => this.searchControl.hasError('required')),
    ),
  );
  readonly patternError = toSignal<boolean>(
    this.searchControl.statusChanges.pipe(
      startWith(this.searchControl.status),
      map(() => this.searchControl.hasError('pattern')),
    ),
  );
  readonly locations$ = this.locationsStore.locations$;
  readonly lastSearchedQuery$ = this.locationsStore.lastSearchedQueryLocations$;
  readonly dropdownState$ = this.locationSearchDropdownService.dropdownState$;

  constructor(
    public locationSearchFormService: LocationSearchFormService,
    private locationSearchDropdownService: LocationSearchDropdownService,
    private locationsStore: LocationsStoreService,
    private locationStore: LocationStoreService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.handleInputChanges();
    this.handleLocation();
  }

  clearSearchInput(): void {
    this.searchControl.markAsTouched();
    this.searchControl.setValue('');
    this.locationsStore.dispatchClearLocations();
  }

  onSelectionChange(location: ILocation): void {
    this.locationStore.dispatchLocationChange(location);
  }

  private handleInputChanges(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(700),
        filter((text: string): text is string => true),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((text: string) => {
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
    this.locationStore.location$.pipe(filterDefined, takeUntilDestroyed(this.destroyRef)).subscribe({
      next: ({ localizedName }: ILocation) => this.searchControl.setValue(localizedName),
    });
  }
}
