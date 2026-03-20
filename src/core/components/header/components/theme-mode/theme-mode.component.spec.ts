import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { ThemeModeComponent } from './theme-mode.component';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { MockThemeStoreService } from '@tests/providers/mock-theme-store.service';
import { HeaderFacadeService } from '@core/components/header/providers/header-facade.service';
import { MockHeaderFacadeService } from '@tests/providers/mock-header-facade.service';

describe('ThemeModeComponent', () => {
  let component: ThemeModeComponent;
  let fixture: ComponentFixture<ThemeModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeModeComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ThemeStoreService, useClass: MockThemeStoreService },
        { provide: HeaderFacadeService, useClass: MockHeaderFacadeService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
