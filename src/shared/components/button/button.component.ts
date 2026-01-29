import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { NgClass } from "@angular/common";

import { BUTTON, BUTTON_WIDTH } from "@shared/components/button/types/button.enum";

@Component({
  selector: 'app-button',
  imports: [MatButton, NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly type = input<BUTTON>(BUTTON.PRIMARY);
  readonly width = input<BUTTON_WIDTH>(BUTTON_WIDTH.MEDIUM);

  readonly typeClass = computed<string>(() => {
    switch (this.type()) {
      case BUTTON.PRIMARY:
        return `button-${BUTTON.PRIMARY}`;
      case BUTTON.UPDATING:
        return `button-${BUTTON.UPDATING}`;
      case BUTTON.ERROR:
        return `button-${BUTTON.ERROR}`;
    }
  });
  readonly widthClass = computed<string>(() => {
    switch (this.width()) {
      case BUTTON_WIDTH.EXTRA_SMALL:
        return 'w-32';
      case BUTTON_WIDTH.SMALL:
        return 'w-36';
      case BUTTON_WIDTH.MEDIUM:
        return 'w-52';
    }
  });
}
