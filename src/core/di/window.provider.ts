import { DOCUMENT, FactoryProvider } from "@angular/core";

import { WINDOW } from "@core/di/window.token";

export const WINDOW_PROVIDER: FactoryProvider = {
  provide: WINDOW,
  useFactory: (document: Document) => document.defaultView,
  deps: [DOCUMENT],
};
