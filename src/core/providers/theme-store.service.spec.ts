import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { ThemeStoreService } from './theme-store.service';

describe('ThemeStoreService', () => {
  let service: ThemeStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore({}), provideZonelessChangeDetection()],
    });
    service = TestBed.inject(ThemeStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
