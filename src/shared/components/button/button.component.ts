import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { NgClass } from "@angular/common";

import { ButtonVariant, ButtonWidth } from "@shared/components/button/types/button.enum";
import { BUTTON_VARIANT_MAP, BUTTON_WIDTH_MAP } from "@shared/components/button/constants/button.constants";
import { ButtonResponsiveType } from "@shared/components/button/types/button.type";

@Component({
  selector: 'app-button',
  imports: [MatButton, NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly hasAutoFocus = input<boolean>(false);
  readonly variant = input<ButtonVariant>(ButtonVariant.PRIMARY);
  readonly width = input<ButtonWidth>(ButtonWidth.MD);
  readonly responsive = input<ButtonResponsiveType>(null);

  readonly variantClass = computed(() => BUTTON_VARIANT_MAP[this.variant()]);
  readonly widthClass = computed(() => {
    const base = BUTTON_WIDTH_MAP[this.width()];
    const responsive = this.responsive();

    if (!responsive) {
      return base;
    }

    return `${responsive}:${base}`;
  });
  readonly modifierClass = computed(() => {
    return this.responsive() !== null ? `breakpoint-${this.responsive()}` : '';
  });

}
