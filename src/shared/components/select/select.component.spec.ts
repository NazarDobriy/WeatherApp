import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { ThemeType } from "@core/types/theme.type";

describe('SelectComponent', () => {
  let component: SelectComponent<ThemeType>;
  let fixture: ComponentFixture<SelectComponent<ThemeType>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectComponent<ThemeType>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
