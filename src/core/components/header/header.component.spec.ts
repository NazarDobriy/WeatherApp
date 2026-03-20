import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { HeaderComponent } from './header.component';
import { MOCK_ACTIVATED_ROUTE } from '@tests/constants/mock-activated-route';
import { LocationStoreService } from '@core/providers/location-store.service';
import { MockLocationStoreService } from '@tests/providers/mock-location-store.service';
import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { MockFavoritesStoreService } from '@tests/providers/mock-favorites-store.service';
import { MockThemeModeComponent } from '@tests/components/mock/mock-theme-mode.component';
import { MockThemeTemperatureComponent } from '@tests/components/mock/mock-theme-temperature.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ActivatedRoute, useValue: MOCK_ACTIVATED_ROUTE },
        { provide: LocationStoreService, useClass: MockLocationStoreService },
        { provide: FavoritesStoreService, useClass: MockFavoritesStoreService },
      ],
    })
      .overrideComponent(HeaderComponent, {
        set: {
          imports: [MockThemeModeComponent, MockThemeTemperatureComponent, AsyncPipe, RouterModule],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
