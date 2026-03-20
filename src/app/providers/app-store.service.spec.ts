import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

import { AppStoreService } from './app-store.service';
import { selectUrl } from '@app/store/selectors';

describe('AppStoreService', () => {
  let service: AppStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideMockStore({ selectors: [{ selector: selectUrl, value: 'home' }] }),
      ],
    });
    service = TestBed.inject(AppStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('check selectUrl$', (done: DoneFn) => {
    service.selectUrl$.subscribe({
      next: (url: string) => {
        expect(url).toBe('home');
        done();
      },
    });
  });
});
