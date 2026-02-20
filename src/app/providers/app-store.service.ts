import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { filter, map, Observable } from "rxjs";

import { IAppState } from "@app/store/state";
import { selectUrl } from "@app/store/selectors";

@Injectable({ providedIn: 'root' })
export class AppStoreService {
  readonly selectUrl$ = this.store.select(selectUrl);

  constructor(private store: Store<IAppState>) {}

  isRoute(path: string): Observable<boolean> {
    return this.selectUrl$.pipe(
      filter((url: string | undefined): url is string => typeof url === "string"),
      map((url: string) => url.startsWith(path)),
    );
  }

}
