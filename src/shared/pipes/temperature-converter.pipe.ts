import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureConverter'
})
export class TemperatureConverterPipe implements PipeTransform {
  transform(value: number, isCelsius: boolean): string {
    return isCelsius
      ? `${value.toFixed(1)}° C`
      : `${((value * 9) / 5 + 32).toFixed(1)} F`;
  }
}
