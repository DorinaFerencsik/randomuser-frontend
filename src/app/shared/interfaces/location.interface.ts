export interface ILocation {
  city: string;
  coordinates: {
    latitude: string,
    longitude: string,
  };
  country: string;
  postcode: number | string;
  state: string;
  street: {
    name: string,
    number: number,
  };
  timezone: {
    offset: string,
    description: string,
  };
}
