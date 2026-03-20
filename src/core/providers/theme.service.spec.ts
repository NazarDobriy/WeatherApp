import { TestBed } from '@angular/core/testing';
import { DOCUMENT, provideZonelessChangeDetection } from '@angular/core';

import { ThemeService } from './theme.service';
import { WINDOW } from '@core/tokens/window.token';
import { MOCK_WINDOW } from '@tests/constants/mock-window';
import { MOCK_DOCUMENT } from '@tests/constants/mock-document';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: WINDOW, useValue: MOCK_WINDOW },
        { provide: DOCUMENT, useValue: MOCK_DOCUMENT },
      ],
    });
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('check getCssVar', () => {
    expect(service.getCssVar('--primary-color')).toBe('#ff0000');
  });
});
