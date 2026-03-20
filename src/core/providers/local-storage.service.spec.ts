import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { WINDOW } from '@core/tokens/window.token';
import { MOCK_WINDOW } from '@tests/constants/mock-window';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
        provideZonelessChangeDetection(),
        { provide: WINDOW, useValue: MOCK_WINDOW },
      ],
    });
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
