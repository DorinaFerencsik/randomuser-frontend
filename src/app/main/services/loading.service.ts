import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { clamp as _clamp } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  public isLoading$: Subject<boolean> = new Subject();

  public startLoading() {
    this.isLoading$.next(true);
  }

  public stopLoading() {
    this.isLoading$.next(false);
  }
}
