import { ILocationApi } from '@core/types/location-api.interface';
import { ILocation } from '@core/types/location.interface';
import { locationMapper } from '@core/mappers/location.mapper';

export function locationsMapper(locations: ILocationApi[]): ILocation[] {
  return locations.map((location: ILocationApi) => locationMapper(location));
}
