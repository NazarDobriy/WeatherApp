import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

import { WeatherStoreService } from './weather-store.service';

describe('WeatherStoreService', () => {
  let service: WeatherStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideMockStore(), WeatherStoreService],
    });
    service = TestBed.inject(WeatherStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
