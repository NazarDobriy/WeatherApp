import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { DialogHelper } from '@shared/components/dialog/helpers/dialog.helper';

@Component({
  selector: 'app-remove-favorite-dialog',
  imports: [DialogComponent],
  templateUrl: './remove-favorite-dialog.component.html',
  styleUrl: './remove-favorite-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveFavoriteDialogComponent extends DialogHelper<RemoveFavoriteDialogComponent> {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string }) {
    super();
  }
}
