import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  open(message: string, action: string): void {
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
      duration: 5000,
      panelClass: ['text-primary', 'bg-transparent']
    });
  }
}
