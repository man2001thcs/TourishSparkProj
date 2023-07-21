import { TestBed } from '@angular/core/testing';

import { CanLoadUserGuard } from './can-load-user.guard';

describe('CanLoadUserGuard', () => {
  let guard: CanLoadUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLoadUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
