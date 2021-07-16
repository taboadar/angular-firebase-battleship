import { TestBed } from '@angular/core/testing';

import { BattleStateService } from './battle-state.service';

describe('BattleStateService', () => {
  let service: BattleStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
