import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NgIf } from '@angular/common';

import { IFavoriteDetailedInfo } from '@core/types/favorite.interface';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { CardComponent } from '@shared/components/card/card.component';
import { TemperatureConverterPipe } from '@shared/pipes/temperature-converter.pipe';

@Component({
  selector: 'app-favorite-cart',
  templateUrl: './favorite-cart.component.html',
  standalone: true,
  imports: [NgIf, CardComponent, TemperatureConverterPipe],
})
export class FavoriteCartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() favorite: IFavoriteDetailedInfo | null = null;

  isCelsius = true;
  temperature: number | null = null;
  private destroy$ = new Subject<void>();

  constructor(private themeStore: ThemeStoreService) {}

  ngOnInit(): void {
    this.themeStore.isCelsius$.pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: (isCelsius: boolean) => (this.isCelsius = isCelsius),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['favorite']?.currentValue) {
      this.temperature = parseFloat(changes['favorite'].currentValue.Temperature.Metric.Value);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
