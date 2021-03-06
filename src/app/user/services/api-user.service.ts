import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IListResponse } from 'src/app/shared/interfaces/list-response.interface';
import { CustomHttpClient } from 'src/app/shared/services/custom-http-client.service';

import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiUserService {

  constructor(private httpClient: CustomHttpClient) {}

  /**
   * Listing users
   * @param params filtering parameters
   */
  public getUserList(params): Observable<IListResponse<IUser>> {
    return this.httpClient.get('', { params });
  }
}
