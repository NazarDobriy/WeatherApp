import { Component, DestroyRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { NgRxLocalStorageService } from '@core/providers/ng-rx-local-storage.service';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { HeaderComponent } from '@core/components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
})
export class AppComponent implements OnInit {
  isDarkMode$ = this.themeStore.isDarkMode$;

  constructor(
    private renderer: Renderer2,
    private destroyRef: DestroyRef,
    private themeStore: ThemeStoreService,
    private ngRxLocalStorage: NgRxLocalStorageService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    this.ngRxLocalStorage.initialization();

    this.isDarkMode$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (isDark: boolean) => {
        const className = 'bg-black-30';

        if (isDark) {
          this.renderer.addClass(this.document.body, className);
        } else {
          this.renderer.removeClass(this.document.body, className);
        }
      },
    });
  }
}
