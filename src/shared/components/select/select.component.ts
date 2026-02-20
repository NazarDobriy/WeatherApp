import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { NgClass } from "@angular/common";

import { ISelect } from "@shared/components/select/types/select.interface";
import { SelectGap } from "@shared/components/select/types/select.enum";
import { SELECT_GAP_MAP } from "@shared/components/select/constants/select.constants";

@Component({
  selector: 'app-select',
  imports: [NgClass],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<T> {
  readonly hideText = input<boolean>(false);
  readonly hideIcon = input<boolean>(false);
  readonly selectedKey = input.required<T>();
  readonly items = input.required<ISelect<T>[]>();
  readonly gap = input<SelectGap>(SelectGap.MD);
  readonly leftClass = input<string>('left-0');
  readonly onSelect = output<T>();

  readonly isOpen = signal<boolean>(false);
  readonly gapClass = computed<string>(() => SELECT_GAP_MAP[this.gap()] || '');
  readonly hideTextClass = computed<string>(() => {
    return this.hideText() ? 'hidden md:block' : 'block';
  });
  readonly hideIconClass = computed<string>(() => {
    return this.hideIcon() ? 'hidden md:block' : 'block';
  });
  readonly selectedItem = computed<ISelect<T>>(() => {
    return this.items().find((item: ISelect<T>) => item.key === this.selectedKey()) || this.items()[0];
  });
}
