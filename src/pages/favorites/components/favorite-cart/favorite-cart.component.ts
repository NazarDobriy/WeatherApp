import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { IFavorite } from '@core/types/favorite.interface';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { CardComponent } from '@shared/components/card/card.component';
import { TemperatureConverterPipe } from '@shared/pipes/temperature-converter.pipe';

@Component({
  selector: 'app-favorite-cart',
  templateUrl: './favorite-cart.component.html',
  standalone: true,
  imports: [CardComponent, TemperatureConverterPipe],
})
export class FavoriteCartComponent implements OnInit, OnDestroy {
  @Input() favorite!: IFavorite;

  isCelsius = true;
  private destroy$ = new Subject<void>();

  get temperature(): number {
    return parseFloat(this.favorite.temperature.Value);
  }

  constructor(private themeStore: ThemeStoreService) {}

  ngOnInit(): void {
    this.themeStore.isCelsius$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isCelsius) => (this.isCelsius = isCelsius));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
