import { ISelect } from "@shared/components/select/types/select.interface";

export const TEMPERATURE_GROUPS: ISelect<boolean>[] = [
  Object.freeze({ iconPath: 'assets/temperature/temperature.svg#temperature', text: '°C', key: true }),
  Object.freeze({ iconPath: 'assets/temperature/temperature.svg#temperature', text: '°F', key: false }),
];
