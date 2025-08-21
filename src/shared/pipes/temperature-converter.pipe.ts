import { Pipe, PipeTransform } from '@angular/core';

import { temperatureConverter } from '@utils/index';

@Pipe({
  name: 'temperatureConverter',
  standalone: true,
})
export class TemperatureConverterPipe implements PipeTransform {
  transform(value: number | null, isCelsius: boolean): string {
    if (!value) {
      return '';
    }

    const convertedValue = temperatureConverter(value, isCelsius);
    const formattedValue =
      convertedValue % 1 === 0
        ? convertedValue.toFixed(0)
        : convertedValue.toFixed(1);
    return isCelsius ? `${formattedValue}° C` : `${formattedValue} F`;
  }
}
