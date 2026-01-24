import { Observable, filter } from 'rxjs';

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

export function filterLoadingDefined<T>(
  source$: Observable<T | null | undefined>
): Observable<T> {
  return source$.pipe(
    filter((item: T | null | undefined): item is T => item !== null && item !== undefined)
  );
}
