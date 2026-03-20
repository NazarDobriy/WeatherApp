import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { RemoveFavoritesDialogComponent } from './remove-favorites-dialog.component';
import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { MockFavoritesStoreService } from '@tests/providers/mock-favorites-store.service';
import { FavoritesRouteStoreService } from '@core/providers/favorites-route-store.service';
import { MockFavoritesRouteStoreService } from '@tests/providers/mock-favorites-route-store.service';
import { MOCK_DIALOG_REF } from '@tests/constants/mock-dialog-ref';

describe('RemoveFavoritesDialogComponent', () => {
  let component: RemoveFavoritesDialogComponent;
  let fixture: ComponentFixture<RemoveFavoritesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveFavoritesDialogComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: FavoritesStoreService, useClass: MockFavoritesStoreService },
        { provide: FavoritesRouteStoreService, useClass: MockFavoritesRouteStoreService },
        { provide: MatDialogRef, useValue: MOCK_DIALOG_REF },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveFavoritesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
