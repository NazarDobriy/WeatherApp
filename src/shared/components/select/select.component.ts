import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { NgClass } from "@angular/common";

import { ISelect } from "@shared/components/select/types/select.interface";

@Component({
  selector: 'app-select',
  imports: [NgClass],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<T> {
  readonly selectedKey = input.required<T>();
  readonly items = input.required<ISelect<T>[]>();
  readonly onSelect = output<T>();

  readonly isOpen = signal<boolean>(false);
  readonly selectedItem = computed<ISelect<T>>(() => {
    return this.items().find((item: ISelect<T>) => item.key === this.selectedKey()) || this.items()[0];
  });
}
