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
  readonly type = input.required<ButtonEnum>();
  readonly width = input.required<ButtonWidthEnum>()

  readonly typeClass = computed<string>(() => {
    switch (this.type()) {
      case ButtonEnum.PRIMARY:
        return 'button-primary';
      case ButtonEnum.WARNING:
        return 'button-warning';
    }
  });
  readonly widthClass = computed<string>(() => {
    switch (this.width()) {
      case ButtonWidthEnum.SMALL:
        return 'w-28';
      case ButtonWidthEnum.MEDIUM:
        return 'w-52';
    }
  });
}
