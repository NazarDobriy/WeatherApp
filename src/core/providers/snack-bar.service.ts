import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {}

  open(message: string, action?: string): void {
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
      duration: 2000,
      panelClass: ['custom-snackbar', 'text-primary', 'bg-transparent']
    });
  }
}
