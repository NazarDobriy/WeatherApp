import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { HomeFacadeService } from './home-facade.service';
import { WeatherStoreService } from '@pages/home/providers/weather-store.service';
import { MockWeatherStoreService } from '@tests/providers/mock-weather-store.service';
import { LocationStoreService } from '@core/providers/location-store.service';
import { MockLocationStoreService } from '@tests/providers/mock-location-store.service';

describe('HomeFacadeService', () => {
  let service: HomeFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomeFacadeService,
        provideZonelessChangeDetection(),
        { provide: WeatherStoreService, useClass: MockWeatherStoreService },
        { provide: LocationStoreService, useClass: MockLocationStoreService },
      ],
    });
    service = TestBed.inject(HomeFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
