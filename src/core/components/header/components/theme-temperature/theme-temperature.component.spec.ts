import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { ThemeTemperatureComponent } from './theme-temperature.component';
import { HeaderFacadeService } from '@core/components/header/providers/header-facade.service';
import { MockHeaderFacadeService } from '@tests/providers/mock-header-facade.service';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { MockThemeStoreService } from '@tests/providers/mock-theme-store.service';

describe('ThemeTemperatureComponent', () => {
  let component: ThemeTemperatureComponent;
  let fixture: ComponentFixture<ThemeTemperatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeTemperatureComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: HeaderFacadeService, useClass: MockHeaderFacadeService },
        { provide: ThemeStoreService, useClass: MockThemeStoreService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
