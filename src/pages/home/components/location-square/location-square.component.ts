import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { ThemeStoreService } from '@core/providers/theme-store.service';

@Component({
  selector: 'app-location-square',
  templateUrl: './location-square.component.html',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationSquareComponent {
  readonly isDarkMode$ = this.themeStore.isDarkMode$;

  constructor(private themeStore: ThemeStoreService) {}
}
