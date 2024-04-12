import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeTemperatureComponent } from './theme-temperature.component';

describe('ThemeTemperatureComponent', () => {
  let component: ThemeTemperatureComponent;
  let fixture: ComponentFixture<ThemeTemperatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeTemperatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
