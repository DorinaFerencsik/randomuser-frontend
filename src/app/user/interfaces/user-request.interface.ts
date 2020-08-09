import { IPagination } from 'src/app/shared/interfaces/pagination.interface';

import { Gender } from '../enums/gender.enum';

export interface IUserRequest extends IPagination {
  gender: Gender;
}
