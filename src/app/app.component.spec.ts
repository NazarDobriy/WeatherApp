import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';

import { AppComponent } from './app.component';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { MockThemeStoreService } from '@tests/providers/mock-theme-store.service';
import { ThemeService } from '@core/providers/theme.service';
import { MockThemeService } from '@tests/providers/mock-theme.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: ThemeStoreService, useClass: MockThemeStoreService },
        { provide: ThemeService, useClass: MockThemeService },
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideStore({}),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
