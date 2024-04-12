import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureConverter'
})
export class TemperatureConverterPipe implements PipeTransform {
  transform(value: number, isCelsius: boolean): number {
    return isCelsius ? value : (value * 9) / 5 + 32;
  }
}
