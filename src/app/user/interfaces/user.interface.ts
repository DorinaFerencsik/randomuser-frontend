import { ILocation } from 'src/app/shared/interfaces/location.interface';

import { ILogin } from './login.interface';

export interface IUser {
  cell: string;
  dob: {
    date: Date,
    age: number,
  };
  email: string;
  id: {
    name: string,
    value: string,
  };
  location: ILocation;
  login: ILogin;
  name: {
    title: string,
    first: string,
    last: string,
  };
  nat: string; // may be enum later on
  picture: {
    thumbnail: string,
    medium: string,
    large: string,
  };
  registered: {
    age: number,
    date: Date,
  };
}
