import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { LocationsService } from './locations.service';
import { ILocation } from '@core/types/location.interface';
import { MOCK_LOCATION } from '@tests/constants/test.constants';

describe('LocationsService', () => {
  let service: LocationsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
        LocationsService,
      ],
    });

    service = TestBed.inject(LocationsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getLocations and return data', () => {
    service.getLocations('Lviv').subscribe({
      next: (locations: ILocation[]) => {
        expect(locations).toEqual([MOCK_LOCATION]);
      },
    });

    const locationsUrl = '/locations/v1/cities/autocomplete';

    const req = httpMock.expectOne(
      (request) => request.url === locationsUrl && request.params.get('q') === 'Lviv',
    );

    expect(req.request.method).toBe('GET');

    req.flush([MOCK_LOCATION]);
  });
});
