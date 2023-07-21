import { TestBed } from '@angular/core/testing';

import { CanLeaveEditGuard } from './can-leave-edit.guard';

describe('CanLeaveEditGuard', () => {
  let guard: CanLeaveEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLeaveEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
