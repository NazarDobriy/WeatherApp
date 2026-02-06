import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";

import { ButtonComponent } from "@shared/components/button/button.component";
import { ButtonVariant, ButtonWidth } from "@shared/components/button/types/button.enum";
import { ButtonIconComponent } from "@shared/components/button-icon/button-icon.component";

@Component({
  selector: 'app-remove-favorites-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ButtonComponent,
    ButtonIconComponent,
  ],
  templateUrl: './remove-favorites-dialog.component.html',
  styleUrls: ['./remove-favorites-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveFavoritesDialogComponent {
  readonly buttonWidth = ButtonWidth;
  readonly buttonVariant = ButtonVariant;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { amount: number },
    private dialogRef: MatDialogRef<RemoveFavoritesDialogComponent>
  ) { }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

}
