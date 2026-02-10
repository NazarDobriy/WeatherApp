import { ISelect } from "@shared/components/select/types/select.interface";

import { ThemeType } from "@core/types/theme.type";

export const THEME_GROUPS: ISelect<ThemeType>[] = [
  Object.freeze({ iconPath: 'assets/theme/auto.svg#auto', text: 'Auto', key: 'auto' }),
  Object.freeze({ iconPath: 'assets/theme/sun.svg#sun', text: 'Light', key: 'light' }),
  Object.freeze({ iconPath: 'assets/theme/moon.svg#moon', text: 'Dark', key: 'dark' }),
];
