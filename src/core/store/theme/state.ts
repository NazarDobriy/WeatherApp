export interface IThemeState {
  isDarkMode: boolean;
  isCelsius: boolean;
  isChartRepresentation: boolean;
}

export const themeInitialState: IThemeState = {
  isDarkMode: false,
  isCelsius: true,
  isChartRepresentation: false,
};
