import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ForecastsComponent } from './forecasts.component';
import { HostForecastsComponent } from '@tests/components/host/host-forecasts.component';
import { MockForecastCardComponent } from '@tests/components/mock/mock-forecast-card.component';

describe('ForecastsComponent', () => {
  let component: ForecastsComponent;
  let fixture: ComponentFixture<HostForecastsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostForecastsComponent],
      providers: [provideZonelessChangeDetection()],
    })
      .overrideComponent(ForecastsComponent, {
        set: {
          imports: [MockForecastCardComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HostForecastsComponent);

    const debugEl = fixture.debugElement.query(By.directive(ForecastsComponent));
    component = debugEl.componentInstance as ForecastsComponent;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
