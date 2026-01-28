import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { AsyncPipe } from "@angular/common";

import {
  ThemeTemperatureComponent
} from '@core/components/header/components/theme-temperature/theme-temperature.component';
import { ThemeModeComponent } from '@core/components/header/components/theme-mode/theme-mode.component';
import { ButtonComponent } from "@shared/components/button/button.component";
import { ButtonEnum, ButtonWidthEnum } from "@shared/components/button/types/button.enum";
import { FavoritesStoreService } from "@core/providers/favorites-store.service";
import { REFRESH_KEY } from "@core/constants/loading.constants";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
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
export class HeaderComponent {
  readonly buttonType = ButtonEnum;
  readonly buttonWidth = ButtonWidthEnum;
  readonly detailedFavorites$ = this.favoritesStore.detailedFavorites$;
  readonly selectIsLoadingDetailedFavorites$ = this.favoritesStore.getLoadingSelectByKey(REFRESH_KEY);

  constructor(private favoritesStore: FavoritesStoreService) {}

  refreshAll(): void {
    this.favoritesStore.dispatchDetailedFavorites(REFRESH_KEY);
  }

}
