import { Component } from '@angular/core';

import { ThemeStoreService } from '@core/providers/theme-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private themeStore: ThemeStoreService) {}

  changeThemeMode(): void {
    this.themeStore.dispatchMode();
  }

  changeThemeTemperature(): void {
    this.themeStore.dispatchTemperature();
  }
}
