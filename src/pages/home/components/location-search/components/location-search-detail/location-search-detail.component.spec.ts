import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';

import { LocationSearchDetailComponent } from './location-search-detail.component';
import { HostLocationSearchDetailComponent } from '@tests/components/host/host-location-search-detail.component';
import { MOCK_LOCATION } from '@tests/constants/test.constants';

describe('LocationSearchDetailComponent', () => {
  let component: LocationSearchDetailComponent;
  let hostComponent: HostLocationSearchDetailComponent;
  let fixture: ComponentFixture<HostLocationSearchDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostLocationSearchDetailComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HostLocationSearchDetailComponent);
    hostComponent = fixture.componentInstance;

    const debugEl = fixture.debugElement.query(By.directive(LocationSearchDetailComponent));
    component = debugEl.componentInstance as LocationSearchDetailComponent;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check input location', () => {
    expect(component.location()).toEqual(MOCK_LOCATION);
  });

  it('check locationDetails, they are full', () => {
    const { country, administrativeArea } = MOCK_LOCATION;
    expect(component.locationDetails()).toBe(
      `(${country?.localizedName}, ${administrativeArea?.localizedName})`,
    );
  });

  it('check locationDetails, if country is undefined', () => {
    const { administrativeArea } = MOCK_LOCATION;

    hostComponent.location.set({
      ...MOCK_LOCATION,
      country: undefined,
    });

    fixture.detectChanges();

    expect(component.locationDetails()).toBe(`(${administrativeArea?.localizedName})`);
  });

  it('check locationDetails, if administrativeArea is undefined', () => {
    const { country } = MOCK_LOCATION;

    hostComponent.location.set({
      ...MOCK_LOCATION,
      administrativeArea: undefined,
    });

    fixture.detectChanges();

    expect(component.locationDetails()).toBe(`(${country?.localizedName})`);
  });

  it('check locationDetails, if country and administrativeArea are undefined', () => {
    hostComponent.location.set({
      ...MOCK_LOCATION,
      country: undefined,
      administrativeArea: undefined,
    });

    fixture.detectChanges();

    expect(component.locationDetails()).toBeNull();
  });
});
