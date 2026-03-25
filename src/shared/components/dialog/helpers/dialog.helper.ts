import { inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export class DialogHelper<T> {
  protected readonly dialogRef = inject(MatDialogRef<T>);

  protected close(): void {
    this.dialogRef.close(false);
  }

  protected confirm(): void {
    this.dialogRef.close(true);
  }
}
