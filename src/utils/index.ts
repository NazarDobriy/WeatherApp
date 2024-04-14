export function temperatureConverter(
  temperature: number,
  isCelsius: boolean
): number {
  if (isCelsius) {
    return temperature;
  }
  return parseFloat(((temperature * 9) / 5 + 32).toFixed(1));
}
