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
import { CardComponent } from './components/card/card.component';

const modules = [
  CommonModule,
  ReactiveFormsModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [CardComponent],
  imports: [...modules],
  exports: [...modules, CardComponent]
})
export class SharedModule {}
