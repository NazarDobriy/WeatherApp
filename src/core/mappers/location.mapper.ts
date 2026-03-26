import { ILocationApi } from '@core/types/location-api.interface';
import { ILocation } from '@core/types/location.interface';

export function locationMapper(location: ILocationApi): ILocation {
  return {
    key: location.Key,
    localizedName: location.LocalizedName,
    administrativeArea: location.AdministrativeArea
      ? {
          id: location.AdministrativeArea.ID,
          localizedName: location.AdministrativeArea.LocalizedName,
        }
      : undefined,
    country: location.Country
      ? {
          id: location.Country.ID,
          localizedName: location.Country.LocalizedName,
        }
      : undefined,
  };
}
