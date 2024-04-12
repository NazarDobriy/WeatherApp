import { Component } from '@angular/core';

import { ThemeStoreService } from 'src/core/providers/theme-store.service';

@Component({
  selector: 'app-theme-mode',
  templateUrl: './theme-mode.component.html'
})
export class ThemeModeComponent {
  isDarkMode$ = this.themeStore.isDarkMode$;

  constructor(private themeStore: ThemeStoreService) {}

  changeThemeMode(): void {
    this.themeStore.dispatchMode();
  }
}
