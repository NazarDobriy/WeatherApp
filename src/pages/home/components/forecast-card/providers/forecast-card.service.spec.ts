import { TestBed } from '@angular/core/testing';

import { ForecastCardService } from './forecast-card.service';

describe('ForecastCardService', () => {
  let service: ForecastCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForecastCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
