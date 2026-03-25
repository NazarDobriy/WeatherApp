import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

import { ButtonComponent } from '@shared/components/button/button.component';
import { ButtonIconComponent } from '@shared/components/button-icon/button-icon.component';
import { ButtonVariant, ButtonWidth } from '@shared/components/button/types/button.enum';

@Component({
  selector: 'app-dialog',
  imports: [ButtonComponent, ButtonIconComponent, MatDialogActions, MatDialogContent, MatDialogTitle],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  readonly title = input.required<string>();
  readonly closeHandler = output();
  readonly confirmHandler = output();

  readonly buttonWidth = ButtonWidth;
  readonly buttonVariant = ButtonVariant;
}
