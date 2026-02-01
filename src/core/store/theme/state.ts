import { ThemeType } from "@core/types/theme.type";

export interface IThemeState {
  theme: ThemeType;
  isCelsius: boolean;
  isChartRepresentation: boolean;
}

export const themeInitialState: IThemeState = {
  theme: 'auto',
  isCelsius: true,
  isChartRepresentation: false,
};
