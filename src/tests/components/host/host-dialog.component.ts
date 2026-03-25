import { Component } from '@angular/core';

import { DialogComponent } from '@shared/components/dialog/dialog.component';

@Component({
  imports: [DialogComponent],
  template: `<app-dialog [title]="title"></app-dialog>`,
})
export class HostDialogComponent {
  readonly title = 'some title';
}
