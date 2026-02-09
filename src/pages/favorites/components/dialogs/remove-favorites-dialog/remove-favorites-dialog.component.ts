import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, signal } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { ButtonComponent } from "@shared/components/button/button.component";
import { ButtonVariant, ButtonWidth } from "@shared/components/button/types/button.enum";
import { ButtonIconComponent } from "@shared/components/button-icon/button-icon.component";
import { FavoritesStoreService } from "@core/providers/favorites-store.service";
import { FavoritesRouteStoreService } from "@core/providers/favorites-route-store.service";

@Component({
  selector: 'app-remove-favorites-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ButtonComponent,
    ButtonIconComponent,
  ],
  templateUrl: './remove-favorites-dialog.component.html',
  styleUrls: ['./remove-favorites-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveFavoritesDialogComponent implements OnInit {
  readonly buttonWidth = ButtonWidth;
  readonly buttonVariant = ButtonVariant;
  readonly amount = signal<number | null>(null);

  constructor(
    private destroyRef: DestroyRef,
    private favoritesStore: FavoritesStoreService,
    private favoritesRouteStore: FavoritesRouteStoreService,
    private dialogRef: MatDialogRef<RemoveFavoritesDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.favoritesStore.detailedFavoritesLength$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
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

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

}
