export interface ILocationReferenceApi {
  ID: string;
  LocalizedName: string;
}

export interface ILocationApi {
  Key: string;
  LocalizedName: string;
  AdministrativeArea?: ILocationReferenceApi;
  Country?: ILocationReferenceApi;
}
