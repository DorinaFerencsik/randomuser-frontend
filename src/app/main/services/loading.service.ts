import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { clamp as _clamp } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public isLoading$: Subject<boolean> = new Subject();

  private queue = 0;

  public addToQueue() {
    this.queue += 1;
    if (this.queue === 1) {
      this.isLoading$.next(true);
    }
  }

  public removeFromQueue() {
    this.queue = _clamp(this.queue - 1, 0);
    if (this.queue === 0) {
      this.isLoading$.next(false);
    }
  }

  public startLoading() {
    this.isLoading$.next(true);
  }

  public stopLoading() {
    this.isLoading$.next(false);
  }
}
