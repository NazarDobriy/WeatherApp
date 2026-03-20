import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';

import { LineChartComponent } from './line-chart.component';
import { WINDOW } from '@core/tokens/window.token';
import { MOCK_WINDOW } from '@tests/constants/mock-window';
import { ThemeService } from '@core/providers/theme.service';
import { MockThemeService } from '@tests/providers/mock-theme.service';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { MockThemeStoreService } from '@tests/providers/mock-theme-store.service';
import { HostLineChartComponent } from '@tests/components/host/host-line-chart.component';

describe('LineChartComponent', () => {
  let component: LineChartComponent;
  let fixture: ComponentFixture<HostLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostLineChartComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: WINDOW, useValue: MOCK_WINDOW },
        { provide: ThemeService, useClass: MockThemeService },
        { provide: ThemeStoreService, useClass: MockThemeStoreService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostLineChartComponent);

    const debugEl = fixture.debugElement.query(By.directive(LineChartComponent));
    component = debugEl.componentInstance as LineChartComponent;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
