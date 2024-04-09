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
  of,
  takeUntil
} from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { LocationsStoreService } from '../../providers/locations-store.service';
import { SnackBarService } from '../../providers/snack-bar.service';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html'
})
export class LocationSearchComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  locations$ = this.locationsStoreService.locations$;
  isLoading$ = this.locationsStoreService.isLoadingLocations$;
  error$ = this.locationsStoreService.locationsFailure$;
  matcher: ErrorStateMatcher = {
    isErrorState: (control: FormControl): boolean => {
      return control.invalid && (control.dirty || control.touched);
    }
  };
  private destroy$ = new Subject<void>();

  get searchInput(): string {
    return this.formGroup.get('searchInput')?.value;
  }

  get requiredError(): boolean | undefined {
    return this.formGroup.get('searchInput')?.hasError('required');
  }

  constructor(
    private formBuilder: FormBuilder,
    private locationsStoreService: LocationsStoreService,
    private snackBarService: SnackBarService
  ) {
    this.formGroup = this.formBuilder.group({
      searchInput: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.handleInputChanges();
    this.handleError();
  }

  clearSearchInput(): void {
    this.formGroup.get('searchInput')?.setValue('');
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    console.log('Selected item:', event.option.value);
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
        this.locationsStoreService.getLocations(text);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
