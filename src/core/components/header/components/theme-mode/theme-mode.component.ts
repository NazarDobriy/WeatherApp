import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from "@angular/common";

import { ThemeType } from "@core/types/theme.type";
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { SelectComponent}  from "@shared/components/select/select.component";
import { THEME_GROUPS } from "@core/components/header/constants/theme-select.constants";
import { HeaderFacadeService } from "@core/components/header/providers/header-facade.service";

@Component({
  selector: 'app-theme-mode',
  templateUrl: './theme-mode.component.html',
  imports: [SelectComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeModeComponent {
  readonly THEME_GROUPS = THEME_GROUPS;
  readonly theme$ = this.themeStore.theme$;

  constructor(
    public headerFacade: HeaderFacadeService,
    private themeStore: ThemeStoreService,
  ) {}

  changeThemeMode(theme: ThemeType | null): void {
    if (theme) {
      this.themeStore.dispatchSetThemeMode(theme);
    }
  }

}
