import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFavoritesDialogComponent } from './remove-favorites-dialog.component';

describe('RemoveFavoritesDialogComponent', () => {
  let component: RemoveFavoritesDialogComponent;
  let fixture: ComponentFixture<RemoveFavoritesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveFavoritesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveFavoritesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
