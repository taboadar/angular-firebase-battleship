import { TestBed } from '@angular/core/testing';

import { BattleshipFunctionsService } from './battleship-functions.service';

describe('BattleshipFunctionsService', () => {
  let service: BattleshipFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleshipFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
