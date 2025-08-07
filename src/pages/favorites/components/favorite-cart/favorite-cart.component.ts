import { Component, DestroyRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IFavoriteDetailedInfo } from '@core/types/favorite.interface';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { CardComponent } from '@shared/components/card/card.component';
import { TemperatureConverterPipe } from '@shared/pipes/temperature-converter.pipe';

@Component({
  selector: 'app-favorite-cart',
  templateUrl: './favorite-cart.component.html',
  standalone: true,
  imports: [CardComponent, TemperatureConverterPipe],
})
export class FavoriteCartComponent implements OnInit, OnChanges {
  @Input() favorite: IFavoriteDetailedInfo | null = null;

  isCelsius = true;
  temperature: number | null = null;

  constructor(
    private destroyRef: DestroyRef,
    private themeStore: ThemeStoreService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['favorite']?.currentValue) {
      this.temperature = parseFloat(changes['favorite'].currentValue.Temperature.Metric.Value);
    }
  }

  ngOnInit(): void {
    this.themeStore.isCelsius$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (isCelsius: boolean) => (this.isCelsius = isCelsius),
    });
  }

}
