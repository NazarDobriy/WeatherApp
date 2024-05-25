import { Observable, filter } from 'rxjs';

export function temperatureConverter(
  temperature: number,
  isCelsius: boolean
): number {
  if (isCelsius) {
    return temperature;
  }
  return parseFloat(((temperature * 9) / 5 + 32).toFixed(1));
}

export function filterDefined<T>(
  source$: Observable<T>
): Observable<NonNullable<T>> {
  return source$.pipe(filter(isDefined));
}

function isDefined<T>(value: T): value is NonNullable<T> {
  return value !== undefined;
}
