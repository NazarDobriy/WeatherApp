import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';

import { SnackBarService } from './snack-bar.service';

@Injectable()
export class ErrorHandlerService implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private snackBarService: SnackBarService) {}

  handleError$(error$: Observable<string | null | Error>): Subscription {
    return error$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (error) => this.handleError(error),
      error: (err) => console.error('Global error handler:', err)
    });
  }

  handleError(error: string | null | Error) {
    if (error instanceof Error) {
      this.snackBarService.open(error.message, 'X');
    } else if (typeof error === 'string') {
      this.snackBarService.open(error, 'X');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
