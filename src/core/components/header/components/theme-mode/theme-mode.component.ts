import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';

import { ThemeStoreService } from '@core/providers/theme-store.service';

@Component({
  selector: 'app-theme-mode',
  templateUrl: './theme-mode.component.html',
  standalone: true,
  imports: [NgIf, AsyncPipe]
})
export class ThemeModeComponent {
  isDarkMode$ = this.themeStore.isDarkMode$;

  constructor(private themeStore: ThemeStoreService) {}

  changeThemeMode(): void {
    this.themeStore.dispatchMode();
  }
}
