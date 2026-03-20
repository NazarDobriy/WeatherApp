import { Component } from '@angular/core';

import { ButtonIconComponent } from '@shared/components/button-icon/button-icon.component';

@Component({
  imports: [ButtonIconComponent],
  template: `<app-button-icon [icon]="icon"></app-button-icon>`,
})
export class HostButtonIconComponent {
  icon = 'close';
}
