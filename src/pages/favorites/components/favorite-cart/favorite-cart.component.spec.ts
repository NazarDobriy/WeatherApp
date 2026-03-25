import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

import { FavoriteCartComponent } from './favorite-cart.component';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { MockThemeStoreService } from '@tests/providers/mock-theme-store.service';
import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { MockFavoritesStoreService } from '@tests/providers/mock-favorites-store.service';
import { HostFavoriteCartComponent } from '@tests/components/host/host-favorite-cart.component';
import { MOCK_ACTIVATED_ROUTE } from '@tests/constants/mock-activated-route';

describe('FavoriteCartComponent', () => {
  let component: FavoriteCartComponent;
  let fixture: ComponentFixture<HostFavoriteCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostFavoriteCartComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ActivatedRoute, useValue: MOCK_ACTIVATED_ROUTE },
        { provide: ThemeStoreService, useClass: MockThemeStoreService },
        { provide: FavoritesStoreService, useClass: MockFavoritesStoreService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostFavoriteCartComponent);

    const debugEl = fixture.debugElement.query(By.directive(FavoriteCartComponent));
    component = debugEl.componentInstance as FavoriteCartComponent;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
