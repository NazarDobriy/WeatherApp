import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { SelectGap } from "@shared/components/select/types/select.enum";
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { SelectComponent } from "@shared/components/select/select.component";
import { TEMPERATURE_GROUPS } from "@core/components/header/constants/temperature-select.constants";
import { HeaderFacadeService } from "@core/components/header/providers/header-facade.service";

@Component({
  selector: 'app-theme-temperature',
  templateUrl: './theme-temperature.component.html',
  imports: [AsyncPipe, SelectComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeTemperatureComponent {
  readonly selectGap = SelectGap;
  readonly TEMPERATURE_GROUPS = TEMPERATURE_GROUPS;
  readonly isCelsius$ = this.themeStore.isCelsius$;

  constructor(
    public headerFacade: HeaderFacadeService,
    private themeStore: ThemeStoreService,
  ) {}

  changeThemeTemperature(isCelsius: boolean | null): void {
    if (isCelsius !== null) {
      this.themeStore.dispatchSetTemperature(isCelsius);
    }
  }
}
