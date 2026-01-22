import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from "@angular/common";

@Injectable()
export class ThemeService {
  private renderer: Renderer2 | null = null;
  private readonly darkClass = 'theme-dark';

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  setDark(isDark: boolean): void  {
    const target = this.document.body;

    if (isDark) {
      this.renderer?.addClass(target, this.darkClass);
    } else {
      this.renderer?.removeClass(target, this.darkClass);
    }
  }
}
