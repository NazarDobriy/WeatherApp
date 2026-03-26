import { TemperatureConverterPipe } from './temperature-converter.pipe';

describe('TemperatureConverterPipe', () => {
  let pipe: TemperatureConverterPipe;

  beforeEach(() => {
    pipe = new TemperatureConverterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('check value is null', () => {
    expect(pipe.transform(null, true)).toBe('');
  });

  it('check celsius temperature', () => {
    expect(pipe.transform(45, true)).toBe('45 °C');
  });

  it('check celsius temperature with tail 2 digits', () => {
    expect(pipe.transform(45.78, true)).toBe('45.8 °C');
  });

  it('check fahrenheit temperature', () => {
    expect(pipe.transform(0, false)).toBe('32 °F');
  });

  it('check fahrenheit temperature with tail 2 digits', () => {
    expect(pipe.transform(-18.56, false)).toBe('-1.4 °F');
  });
});
