import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { RemoveFavoriteDialogComponent } from './remove-favorite-dialog.component';
import { MOCK_DIALOG_REF } from '@tests/constants/mock-dialog-ref';
import { MOCK_DIALOG_DATA } from '@tests/constants/mock-dialog-data';

describe('RemoveFavoriteDialogComponent', () => {
  let component: RemoveFavoriteDialogComponent;
  let fixture: ComponentFixture<RemoveFavoriteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveFavoriteDialogComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MatDialogRef, useValue: MOCK_DIALOG_REF },
        { provide: MAT_DIALOG_DATA, useValue: MOCK_DIALOG_DATA },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveFavoriteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
