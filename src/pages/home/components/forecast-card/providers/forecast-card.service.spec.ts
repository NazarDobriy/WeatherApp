import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { ForecastCardService } from './forecast-card.service';

describe('ForecastCardService', () => {
  let service: ForecastCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForecastCardService, provideZonelessChangeDetection()],
    });
    service = TestBed.inject(ForecastCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
