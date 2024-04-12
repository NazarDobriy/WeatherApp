import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSquareComponent } from './location-square.component';

describe('LocationSquareComponent', () => {
  let component: LocationSquareComponent;
  let fixture: ComponentFixture<LocationSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationSquareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
