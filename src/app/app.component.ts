import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { NgRxLocalStorageService } from '@core/providers/ng-rx-local-storage.service';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { HeaderComponent } from '@core/components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [AsyncPipe, RouterOutlet, HeaderComponent],
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
