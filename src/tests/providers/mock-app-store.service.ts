import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockAppStoreService {
  readonly selectUrl$ = of('home');

  isRoute(path: string): Observable<boolean> {
    return of(true);
  }
}
