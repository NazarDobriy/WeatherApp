import { Inject, Injectable, Renderer2, RendererFactory2, DOCUMENT } from '@angular/core';

import { ThemeType } from "@core/types/theme.type";
import { WINDOW } from "@core/di/window.token";

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2 | null = null;
  private mediaQuery: MediaQueryList | null = null;
  private currentTheme: ThemeType = 'auto';
  private readonly darkClass = 'theme-dark';
  private readonly target = this.document.body;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.mediaQuery = this.window.matchMedia('(prefers-color-scheme: dark)');
    this.mediaQuery.addEventListener('change', () => this.onOSThemeChange());
  }

  getCssVar(name: string): string {
    return getComputedStyle(this.document.body).getPropertyValue(name).trim();
  }

  setTheme(theme: ThemeType): void  {
    this.currentTheme = theme;

    switch (theme) {
      case "dark":
        this.renderer?.addClass(this.target, this.darkClass);
        break;
      case "light":
        this.renderer?.removeClass(this.target, this.darkClass);
        break;
      case "auto":
        this.applyAutoTheme();
        break;
    }
  }

  private onOSThemeChange(): void {
    if (this.currentTheme === 'auto') {
      this.applyAutoTheme();
    }
  }

  private applyAutoTheme(): void {
    if (this.mediaQuery?.matches) {
      this.renderer?.addClass(this.target, this.darkClass);
    } else {
      this.renderer?.removeClass(this.target, this.darkClass);
    }
  }

}
