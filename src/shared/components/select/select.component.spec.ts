import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SelectComponent } from './select.component';
import { ThemeType } from '@core/types/theme.type';
import { HostSelectComponent } from '@tests/components/host/host-select.component';

describe('SelectComponent', () => {
  let component: SelectComponent<ThemeType>;
  let fixture: ComponentFixture<HostSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostSelectComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HostSelectComponent);

    const debugEl = fixture.debugElement.query(By.directive(SelectComponent));
    component = debugEl.componentInstance as SelectComponent<ThemeType>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
