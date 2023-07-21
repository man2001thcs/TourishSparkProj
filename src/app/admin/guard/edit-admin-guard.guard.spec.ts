import { TestBed } from '@angular/core/testing';

import { CanEditAdminGuard } from './edit-admin-guard.guard';

describe('AccessAdminGuardGuard', () => {
  let guard: CanEditAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanEditAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
