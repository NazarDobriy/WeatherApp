import { Observable, filter, delayWhen, timer, of } from 'rxjs';

export function temperatureConverter(temperature: number, isCelsius: boolean): number {
  if (isCelsius) {
    return temperature;
  }
  return parseFloat(((temperature * 9) / 5 + 32).toFixed(1));
}

export function filterDefined<T>(
  source$: Observable<T | null | undefined>
): Observable<T> {
  return source$.pipe(filter((item: T | null | undefined): item is T => !!item));
}

export function minLoadingTime<T>(minMs = 300): (source$: Observable<T>) => Observable<T> {
  return (source$: Observable<T>): Observable<T> => {
    const start = Date.now();

    return source$.pipe(
      delayWhen(() => {
        const elapsed = Date.now() - start;
        return elapsed < minMs ? timer(minMs - elapsed) : of(null);
      }),
    );
  };
}
