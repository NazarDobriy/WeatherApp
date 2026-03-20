import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { LocationSearchComponent } from './location-search.component';
import { LocationSearchFormService } from '@pages/home/components/location-search/providers/location-search-form.service';
import { MockLocationSearchFormService } from '@tests/providers/mock-location-search-form.service';
import { LocationSearchDropdownService } from '@pages/home/components/location-search/providers/location-search-dropdown.service';
import { MockLocationSearchDropdownService } from '@tests/providers/mock-location-search-dropdown.service';
import { MockLocationsStoreService } from '@tests/providers/mock-locations-store.service';
import { LocationsStoreService } from '@pages/home/providers/locations-store.service';
import { LocationStoreService } from '@core/providers/location-store.service';
import { MockLocationStoreService } from '@tests/providers/mock-location-store.service';

describe('LocationSearchComponent', () => {
  let component: LocationSearchComponent;
  let fixture: ComponentFixture<LocationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationSearchComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: LocationSearchFormService, useClass: MockLocationSearchFormService },
        { provide: LocationSearchDropdownService, useClass: MockLocationSearchDropdownService },
        { provide: LocationsStoreService, useClass: MockLocationsStoreService },
        { provide: LocationStoreService, useClass: MockLocationStoreService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
