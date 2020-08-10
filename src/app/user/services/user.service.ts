import { Injectable } from '@angular/core';
import { Observable, of, timer} from 'rxjs';
import { takeWhile, tap, switchMap, map, takeLast } from 'rxjs/operators';
import { random as _random, shuffle as _shuffle } from 'lodash';

import { primes, isPrime, removeNonDigits, splitToDigits } from 'src/app/shared/utils/number.utils';

import { ApiUserService } from './api-user.service';
import { IUser } from '../interfaces/user.interface';
import { IUserRequest } from '../interfaces/user-request.interface';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private api: ApiUserService) {}

  /**
   * Listing users from API
   * @param params filtering parameters
   * @param mock whether to use mock data or polling for getting users with right postcode.
   */
  public getUsers(params: IUserRequest, mock = false){
    return mock ? this.getMockedUsers(params) : this.getUsersWithPolling(params);
  }

  /**
   * Polling the API for users with atleast 2 prime numbers in their postcode.
   * @param params filtering parameters
   */
  private getUsersWithPolling(params: IUserRequest): Observable<IUser[]> {
    const res: IUser[] = [];
    return timer(0, 500).pipe(
      switchMap(() => this.api.getUserList(params).pipe(map(response => response.results))),
      takeWhile(() => res.length < params.results),
      tap(users => {
        res.push(...users.filter(user => this.numberOfPrimes(user.location.postcode) >= 2));
      }),
      switchMap(() => of(res)),
      takeLast(1),
    );
  }

  /**
   * Listing users and changing their postcodes with mocked values, which contains 2 prime numbers.
   * @param params filtering parameters
   */
  private getMockedUsers(params: IUserRequest): Observable<IUser[]> {
    this.generatePostCode();
    return this.api.getUserList(params).pipe(
        map((result) => (result.results.map(user => ({
          ...user,
          location: {
            ...user.location,
            postcode: this.generatePostCode(),
          },
        }),
        )
      ))
    );
  }

  /**
   * Checking the number of primes in a given number.
   * @param value number to be checked
   */
  private numberOfPrimes(value: number | string): number {
    const cleaned = removeNonDigits(value.toString());
    const digits = [];
    for (let i = 1; i < cleaned.length; i++) {
      digits.push(...splitToDigits(cleaned, i));
    }
    digits.push(cleaned);

    return digits
      .map(digit => isPrime(digit))
      .filter(prime => prime)
      .length;
  }

  /**
   * Generating 4 digit postcodes with 2 prime numbers and one random value.
   */
  private generatePostCode() {
    const parts = [
      ...primes(1, 1),
      ...primes(2, 1),
      _random(9)
    ];

    return _shuffle(parts).join('');
  }
}
