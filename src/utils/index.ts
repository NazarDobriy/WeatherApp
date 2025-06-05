import { Observable, filter } from 'rxjs';

export function temperatureConverter(temperature: number, isCelsius: boolean): number {
  if (isCelsius) {
    return temperature;
  }
  return parseFloat(((temperature * 9) / 5 + 32).toFixed(1));
}

export function filterDefined<T>(
  source$: Observable<T | null>
): Observable<T> {
  return source$.pipe(filter((item: T | null): item is T => !!item));
}
