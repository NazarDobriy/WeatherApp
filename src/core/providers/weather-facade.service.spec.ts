import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { WeatherFacadeService } from './weather-facade.service';
import { WeatherService } from '@core/providers/weather.service';
import { MockWeatherService } from '@tests/providers/mock-weather.service';

describe('WeatherFacadeService', () => {
  let service: WeatherFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherFacadeService,
        provideZonelessChangeDetection(),
        { provide: WeatherService, useClass: MockWeatherService },
      ],
    });
    service = TestBed.inject(WeatherFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
