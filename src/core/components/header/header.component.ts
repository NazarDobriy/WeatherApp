import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RouterModule } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { AsyncPipe } from "@angular/common";
import { filter } from "rxjs";

import {
  ThemeTemperatureComponent
} from '@core/components/header/components/theme-temperature/theme-temperature.component';
import { ThemeModeComponent } from '@core/components/header/components/theme-mode/theme-mode.component';
import { ButtonComponent } from "@shared/components/button/button.component";
import { ButtonVariant } from "@shared/components/button/types/button.enum";
import { FavoritesStoreService } from "@core/providers/favorites-store.service";
import { REFRESH_KEY } from "@core/constants/loading.constants";
import { DialogService } from "@core/providers/dialog.service";
import {
  RemoveFavoritesDialogComponent,
} from "@core/components/header/components/dialogs/remove-favorites-dialog/remove-favorites-dialog.component";
import { IFavoriteDetailedInfo } from "@core/types/favorite.interface";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    RouterModule,
    ThemeModeComponent,
    ThemeTemperatureComponent,
    ButtonComponent,
    MatIcon,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  readonly buttonVariant = ButtonVariant;
  readonly detailedFavorites = signal<IFavoriteDetailedInfo[]>([]);
  readonly selectIsLoadingDetailedFavorites$ = this.favoritesStore.getLoadingSelectByKey(REFRESH_KEY);

  constructor(
    private destroyRef: DestroyRef,
    private dialogService: DialogService,
    private favoritesStore: FavoritesStoreService,
  ) {}

  ngOnInit(): void {
    this.favoritesStore.detailedFavorites$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (detailedFavorites: IFavoriteDetailedInfo[]) => {
        this.detailedFavorites.set(detailedFavorites);
      },
    });
  }

  refreshAll(): void {
    this.favoritesStore.dispatchDetailedFavorites(REFRESH_KEY);
  }

  removeAll(): void {
    this.dialogService.open<
      RemoveFavoritesDialogComponent,
      { amount: number },
      boolean
    >(RemoveFavoritesDialogComponent, {
      data: { amount: this.detailedFavorites().length },
      panelClass: 'custom-dialog',
    }).afterClosed().pipe(
      filter((item: boolean | undefined) => !!item),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: () => this.favoritesStore.dispatchRemoveFavorites(),
    });
  }

}
