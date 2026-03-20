import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ForecastCardComponent } from './forecast-card.component';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { MockThemeStoreService } from '@tests/providers/mock-theme-store.service';
import { HostForecastCardComponent } from '@tests/components/host/host-forecast-card.component';

describe('ForecastCardComponent', () => {
  let component: ForecastCardComponent;
  let fixture: ComponentFixture<HostForecastCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostForecastCardComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ThemeStoreService, useClass: MockThemeStoreService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostForecastCardComponent);

    const debugEl = fixture.debugElement.query(By.directive(ForecastCardComponent));
    component = debugEl.componentInstance as ForecastCardComponent;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
