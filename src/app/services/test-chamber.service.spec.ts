import { TestBed } from '@angular/core/testing';

import { TestChamberService } from './test-chamber.service';

describe('TestChamberService', () => {
  let service: TestChamberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestChamberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
