import { Injectable } from '@angular/core';

@Injectable()
export class MockThemeService {
  getCssVar(name: string): string {
    return 'some text';
  }
}
