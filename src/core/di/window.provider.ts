import { DOCUMENT, FactoryProvider } from "@angular/core";

import { WINDOW } from "@core/tokens/window.token";

export const WINDOW_PROVIDER: FactoryProvider = Object.freeze({
  provide: WINDOW,
  useFactory: (document: Document) => document.defaultView,
  deps: [DOCUMENT],
});
