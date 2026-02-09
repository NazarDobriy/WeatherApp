import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";

import { IAppState } from "@app/store/state";
import { selectQueryParams, selectUrl } from "@app/store/selectors";

@Injectable({ providedIn: 'root' })
export class AppStoreService {
  readonly selectUrl$ = this.store.select(selectUrl);
  readonly queryParams$ = this.store.select(selectQueryParams);

  constructor(private store: Store<IAppState>) {}

}
