import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { CardComponent } from './components/card/card.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { TemperatureConverterPipe } from './pipes/temperature-converter.pipe';

const modules = [
  CommonModule,
  ReactiveFormsModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatSlideToggleModule
];

@NgModule({
  declarations: [CardComponent, LineChartComponent, TemperatureConverterPipe],
  imports: [...modules],
  exports: [
    ...modules,
    CardComponent,
    LineChartComponent,
    TemperatureConverterPipe
  ]
})
export class SharedModule {}
