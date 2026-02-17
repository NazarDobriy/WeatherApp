import { Inject, Injectable } from '@angular/core';

import { WINDOW } from "@core/tokens/window.token";

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  constructor(@Inject(WINDOW) private window: Window) {}

  get<T>(key: string): T | null {
    const storageState = this.window.localStorage.getItem(key);

    if (!storageState) {
      return null;
    }

    try {
      return JSON.parse(storageState);
    } catch (e) {
      console.error(`Error parsing localStorage key "${key}"`, e);
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      this.window.localStorage.setItem(key, serialized);
    } catch (e) {
      console.error(`Error saving localStorage key "${key}"`, e);
    }
  }

}
