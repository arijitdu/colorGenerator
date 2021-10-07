import { TestBed } from '@angular/core/testing';

import { DataresolveResolver } from './dataresolve.resolver';

describe('DataresolveResolver', () => {
  let resolver: DataresolveResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DataresolveResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
