import { TestBed } from '@angular/core/testing';

import { WaitingStateService } from './waiting-state.service';

describe('WaitingStateService', () => {
  let service: WaitingStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaitingStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
