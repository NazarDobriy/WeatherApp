import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { ILocation } from '@core/types/location.interface';

@Component({
  selector: 'app-location-search-detail',
  templateUrl: './location-search-detail.component.html',
  styleUrl: './location-search-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationSearchDetailComponent {
  readonly location = input.required<ILocation>();

  readonly locationDetails = computed<string | null>(() => {
    const location = this.location();
    const { country, administrativeArea } = location;
    const parts = [country?.localizedName, administrativeArea?.localizedName].filter(Boolean);
    return parts.length ? `(${parts.join(', ')})` : null;
  });
}
