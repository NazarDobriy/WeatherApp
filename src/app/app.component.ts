import { Component, OnInit } from '@angular/core';

import { NgRxLocalStorageService } from '@core/providers/ng-rx-local-storage.service';
import { ThemeStoreService } from '@core/providers/theme-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isDarkMode$ = this.themeStore.isDarkMode$;

  constructor(
    private themeStore: ThemeStoreService,
    private ngRxLocalStorage: NgRxLocalStorageService
  ) {}

  ngOnInit(): void {
    this.ngRxLocalStorage.initialization();
  }
}
