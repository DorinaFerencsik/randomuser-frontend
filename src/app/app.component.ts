import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

import { LoadingService } from './main/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'randomuser-frontend';

  public isLoading = false;

  private destroy$ = new Subject();

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.isLoading$.pipe(
      debounceTime(200),
      takeUntil(this.destroy$),
    ).subscribe(status => this.isLoading = status);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
