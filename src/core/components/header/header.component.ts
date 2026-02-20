import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { AsyncPipe } from "@angular/common";

import {
  ThemeTemperatureComponent
} from '@core/components/header/components/theme-temperature/theme-temperature.component';
import { ThemeModeComponent } from '@core/components/header/components/theme-mode/theme-mode.component';
import { ButtonComponent } from "@shared/components/button/button.component";
import { ButtonVariant } from "@shared/components/button/types/button.enum";
import { FavoritesStoreService } from "@core/providers/favorites-store.service";
import { REFRESH_KEY } from "@core/constants/loading.constants";
import { LocationStoreService } from "@core/providers/location-store.service";
import { HeaderFacadeService } from "@core/components/header/providers/header-facade.service";

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
  providers: [HeaderFacadeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly buttonVariant = ButtonVariant;
  readonly detailedFavorites$ = this.favoritesStore.detailedFavorites$;
  readonly selectIsLoadingDetailedFavorites$ = this.favoritesStore.getLoadingSelectByKey(REFRESH_KEY);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private locationStore: LocationStoreService,
    private favoritesStore: FavoritesStoreService,
  ) {}

  resetLocation(): void {
    this.locationStore.dispatchResetLocation();
  }

  refreshAll(): void {
    this.favoritesStore.dispatchDetailedFavorites(REFRESH_KEY);
  }

  removeAll(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { action: 'removeAll' },
      queryParamsHandling: 'merge',
    });
  }

}
