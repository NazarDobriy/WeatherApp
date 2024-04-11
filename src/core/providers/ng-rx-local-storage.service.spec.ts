import { TestBed } from '@angular/core/testing';

import { NgRxLocalStorageService } from './ng-rx-local-storage.service';

describe('NgRxLocalStorageService', () => {
  let service: NgRxLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgRxLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
