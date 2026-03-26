import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { WeatherService } from './weather.service';
import { IWeather } from '@core/types/weather.interface';
import { MOCK_KEY, MOCK_WEATHER, MOCK_WEATHER_API } from '@tests/constants/test.constants';

describe('WeatherService', () => {
  let service: WeatherService;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), { provide: HttpClient, useValue: mockHttpClient }],
    });
    service = TestBed.inject(WeatherService);

    mockHttpClient.get.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('check getWeather', () => {
    mockHttpClient.get.and.returnValue(of([MOCK_WEATHER_API]));

    service.getWeather(MOCK_KEY).subscribe({
      next: (response: IWeather) => {
        expect(response).toEqual(MOCK_WEATHER);
      },
    });

    expect(mockHttpClient.get).toHaveBeenCalledOnceWith(`/currentconditions/v1/${MOCK_KEY}`);
  });
});
