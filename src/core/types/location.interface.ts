export interface ILocationReference {
  id: string;
  localizedName: string;
}

export interface ILocation {
  key: string;
  localizedName: string;
  administrativeArea?: ILocationReference;
  country?: ILocationReference;
}
