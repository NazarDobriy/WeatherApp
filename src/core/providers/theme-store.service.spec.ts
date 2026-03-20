import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideZonelessChangeDetection } from '@angular/core';

import { ThemeStoreService } from './theme-store.service';

describe('ThemeStoreService', () => {
  let service: ThemeStoreService;
  let store: jasmine.SpyObj<Store>;

  beforeEach(() => {
    store = jasmine.createSpyObj<Store>('Store', ['dispatch', 'select']);

    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), { provide: Store, useValue: store }],
    });
    service = TestBed.inject(ThemeStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
