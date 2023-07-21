import { TestBed } from '@angular/core/testing';

import { CanLoadGuardAdmin } from './can-load.guard';

describe('CanLoadGuard', () => {
  let guard: CanLoadGuardAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLoadGuardAdmin);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
