export interface IThemeState {
  isDarkMode: boolean;
  isCelsius: boolean;
}

export const themeInitialState: IThemeState = {
  isDarkMode: false,
  isCelsius: true
};
