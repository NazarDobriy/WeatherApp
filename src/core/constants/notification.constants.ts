export const NOTIFICATION = {
  ERROR_GETTING_FAVOURITES: 'Http failure response for getting favorites weather',
  ERROR_SEARCHING_LOCATION: 'Error while searching location',
  ERROR_GETTING_WEATHER: 'Http failure response for getting weather',
  ERROR_GETTING_FORECAST: 'Http failure response for getting forecast',
  ERROR_GETTING_LOCATION: 'Http failure response for getting location',
  ERROR_UPDATING_WEATHER: (name: string): string => `Http failure response for updating weather in ${name}`,
  SUCCESS_ADDING_FAVOURITE: 'Success adding location to favorite list',
  SUCCESS_REMOVING_FAVOURITE: 'Success removing location from favorite list',
  SUCCESS_UPDATING_WEATHER: (name: string): string => `The weather in ${name} has been successfully updated`,
};
