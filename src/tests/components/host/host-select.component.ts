import { Component } from '@angular/core';

import { SelectComponent } from '@shared/components/select/select.component';
import { THEME_GROUPS } from '@core/components/header/constants/theme-select.constants';

@Component({
  imports: [SelectComponent],
  template: `<app-select [selectedKey]="selectedKey" [items]="THEME_GROUPS"></app-select>`,
})
export class HostSelectComponent {
  readonly THEME_GROUPS = THEME_GROUPS;
  readonly selectedKey = 'dark';
}
