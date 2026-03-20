import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ButtonIconComponent } from './button-icon.component';
import { HostButtonIconComponent } from '@tests/components/host/host-button-icon.component';

describe('ButtonIconComponent', () => {
  let fixture: ComponentFixture<HostButtonIconComponent>;
  let component: ButtonIconComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostButtonIconComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HostButtonIconComponent);

    const debugEl = fixture.debugElement.query(By.directive(ButtonIconComponent));
    component = debugEl.componentInstance as ButtonIconComponent;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct icon', () => {
    expect(component.icon()).toBe('close');
  });
});
