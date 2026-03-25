import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { FavoritesRouteStoreService } from '@core/providers/favorites-route-store.service';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { DialogHelper } from '@shared/components/dialog/helpers/dialog.helper';

@Component({
  selector: 'app-remove-favorites-dialog',
  imports: [DialogComponent],
  templateUrl: './remove-favorites-dialog.component.html',
  styleUrl: './remove-favorites-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveFavoritesDialogComponent
  extends DialogHelper<RemoveFavoritesDialogComponent>
  implements OnInit
{
  readonly amount = signal<number | null>(null);

  constructor(
    private destroyRef: DestroyRef,
    private favoritesStore: FavoritesStoreService,
    private favoritesRouteStore: FavoritesRouteStoreService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.favoritesStore.detailedFavoritesLength$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (amount: number) => {
        if (amount <= 0) {
          this.dialogRef.close(false);
          this.favoritesRouteStore.dispatchRemoveFavoritesEmpty();
        } else {
          this.amount.set(amount);
        }
      },
    });
  }
}
