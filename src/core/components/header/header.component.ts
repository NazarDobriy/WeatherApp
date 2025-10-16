import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  ThemeTemperatureComponent
} from '@core/components/header/components/theme-temperature/theme-temperature.component';
import { ThemeModeComponent } from '@core/components/header/components/theme-mode/theme-mode.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [RouterModule, ThemeModeComponent, ThemeTemperatureComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
