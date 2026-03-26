import { temperatureConverter } from '@utils/index';

describe('App utils', () => {
  describe('temperatureConverter', () => {
    it('check celsius plus temperatureConverter', () => {
      expect(temperatureConverter(23, true)).toBe(23);
    });

    it('check fahrenheit plus temperatureConverter', () => {
      expect(temperatureConverter(23, false)).toBe(73.4);
    });

    it('check celsius minus temperatureConverter', () => {
      expect(temperatureConverter(-23, true)).toBe(-23);
    });

    it('check fahrenheit minus temperatureConverter', () => {
      expect(temperatureConverter(-23, false)).toBe(-9.4);
    });

    it('check temperatureConverter celsius plus zero', () => {
      expect(temperatureConverter(0, true)).toBe(0);
    });

    it('check temperatureConverter fahrenheit plus zero', () => {
      expect(temperatureConverter(0, false)).toBe(32);
    });

    it('check temperatureConverter celsius minus zero', () => {
      expect(temperatureConverter(-0, true)).toBe(0);
    });

    it('check temperatureConverter fahrenheit minus zero', () => {
      expect(temperatureConverter(-0, false)).toBe(32);
    });

    it('check temperatureConverter fahrenheit get zero', () => {
      expect(temperatureConverter(-17.8, false)).toBe(0);
    });
  });
});
