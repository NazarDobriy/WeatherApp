import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RouterOutlet } from '@angular/router';

import { NgRxLocalStorageService } from '@core/providers/ng-rx-local-storage.service';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { HeaderComponent } from '@core/components/header/header.component';
import { ThemeService } from "@core/providers/theme.service";
import { ThemeType } from "@core/types/theme.type";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  constructor(
    private destroyRef: DestroyRef,
    private themeService: ThemeService,
    private themeStore: ThemeStoreService,
    private ngRxLocalStorage: NgRxLocalStorageService,
  ) {}

  ngOnInit(): void {
    this.ngRxLocalStorage.initialization();
    this.handleBodyBackground();
  }

  private handleBodyBackground(): void {
    this.themeStore.theme$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (theme: ThemeType) => {
        this.themeService.setTheme(theme);
      },
    });
  }

}
