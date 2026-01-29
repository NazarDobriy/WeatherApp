import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { NgClass } from "@angular/common";

import { ButtonEnum, ButtonWidthEnum } from "@shared/components/button/types/button.enum";

@Component({
  selector: 'app-button',
  imports: [MatButton, NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly type = input<ButtonEnum>(ButtonEnum.PRIMARY);
  readonly width = input<ButtonWidthEnum>(ButtonWidthEnum.MEDIUM);

  readonly typeClass = computed<string>(() => {
    switch (this.type()) {
      case ButtonEnum.PRIMARY:
        return `button-${ButtonEnum.PRIMARY}`;
      case ButtonEnum.UPDATING:
        return `button-${ButtonEnum.UPDATING}`;
      case ButtonEnum.ERROR:
        return `button-${ButtonEnum.ERROR}`;
    }
  });
  readonly widthClass = computed<string>(() => {
    switch (this.width()) {
      case ButtonWidthEnum.EXTRA_SMALL:
        return 'w-32';
      case ButtonWidthEnum.SMALL:
        return 'w-36';
      case ButtonWidthEnum.MEDIUM:
        return 'w-52';
    }
  });
}
