import { Injectable } from '@angular/core';

@Injectable()
export class MockLocalStorageService {
  get(): string {
    return 'dark';
  }
}
