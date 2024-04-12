import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureConverter'
})
export class TemperatureConverterPipe implements PipeTransform {
  transform(value: number, isCelsius: boolean): number {
    if (isCelsius) {
      return value;
    }
    return (value * 9) / 5 + 32;
  }
}
