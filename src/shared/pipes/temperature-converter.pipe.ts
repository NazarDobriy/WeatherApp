import { Pipe, PipeTransform } from '@angular/core';

import { temperatureConverter } from 'src/utils';

@Pipe({
  name: 'temperatureConverter'
})
export class TemperatureConverterPipe implements PipeTransform {
  transform(value: number, isCelsius: boolean): string {
    const convertedValue = temperatureConverter(value, isCelsius);
    const formattedValue =
      convertedValue % 1 === 0
        ? convertedValue.toFixed(0)
        : convertedValue.toFixed(1);
    return isCelsius ? `${formattedValue}° C` : `${formattedValue} F`;
  }
}
