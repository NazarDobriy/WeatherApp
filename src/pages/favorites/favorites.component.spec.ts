import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { FavoritesComponent } from './favorites.component';
import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { MockFavoritesStoreService } from '@tests/providers/mock-favorites-store.service';
import { LocationStoreService } from '@core/providers/location-store.service';
import { MockLocationStoreService } from '@tests/providers/mock-location-store.service';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: FavoritesStoreService, useClass: MockFavoritesStoreService },
        { provide: LocationStoreService, useClass: MockLocationStoreService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
