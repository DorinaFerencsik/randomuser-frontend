import { random as _random, shuffle as _shuffle } from 'lodash';

/**
 * Generates n random prime numbers
 * @param digits number of digits of generated primes
 * @param n number of primes to return with
 */
export function primes(digits: number, n?: number): number[] {
  const min = digits === 1 ? 2 : Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  const storeMax  = [];
  const primeMax = [];
  for (let i = 2; i <= max; ++i) {
      if (!storeMax[i]) {
        primeMax.push(i);
        for (let j = i << 1; j <= max; j += i) {
          storeMax[j] = true;
        }
      }
  }

  const storeMin = [];
  const primeMin = [];
  for (let i = 2; i <= min; ++i) {
      if (!storeMin[i]) {
          primeMin.push(i);
          for (let j = i << 1; j <= max; j += i) {
            storeMin[j] = true;
          }
      }
  }

  primeMax.splice(0, primeMin.length);

  return _shuffle(primeMax).slice(0, n || primeMax.length);
}

export function isPrime(value: number): boolean {
  for (let i = 2, s = Math.sqrt(value); i <= s; i++) {
    if (value % i === 0) {
      return false;
    }
  }
  return value > 1;
}
