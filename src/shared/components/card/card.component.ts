import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgClass } from "@angular/common";

import { CARD } from "@shared/components/card/types/card.enum";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class CardComponent {
  readonly type = input<CARD>(CARD.WEATHER);

  readonly typeClass = computed<string>(() => {
    switch (this.type()) {
      case CARD.WEATHER:
        return 'gap-5 py-9 w-40';
      case CARD.FAVORITE:
        return 'gap-3 py-7 w-44';
    }
  });
}
