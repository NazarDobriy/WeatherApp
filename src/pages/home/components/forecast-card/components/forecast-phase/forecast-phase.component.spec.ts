import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ForecastPhaseComponent } from './forecast-phase.component';
import { HostForecastPhaseComponent } from '@tests/components/host/host-forecast-phase.component';

describe('ForecastPhaseComponent', () => {
  let component: ForecastPhaseComponent;
  let fixture: ComponentFixture<HostForecastPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostForecastPhaseComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HostForecastPhaseComponent);

    const debugEl = fixture.debugElement.query(By.directive(ForecastPhaseComponent));
    component = debugEl.componentInstance as ForecastPhaseComponent;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
