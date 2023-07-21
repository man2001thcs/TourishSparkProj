import { TestBed } from '@angular/core/testing';

import { EditDetailResolver } from './edit-detail.resolver';

describe('EditDetailResolver', () => {
  let resolver: EditDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EditDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
