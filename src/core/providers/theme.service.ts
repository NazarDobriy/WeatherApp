import { Inject, Injectable, Renderer2, RendererFactory2, DOCUMENT } from '@angular/core';

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

  getCssVar(name: string): string {
    return getComputedStyle(this.document.body).getPropertyValue(name).trim();
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
