import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastPhaseComponent } from './forecast-phase.component';

describe('ForecastPhaseComponent', () => {
  let component: ForecastPhaseComponent;
  let fixture: ComponentFixture<ForecastPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastPhaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
