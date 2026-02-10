import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { ComponentType } from "@angular/cdk/portal";

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  open<T, D, R>(component: ComponentType<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R> {
    return this.dialog.open<T, D, R>(component, config);
  }
}
