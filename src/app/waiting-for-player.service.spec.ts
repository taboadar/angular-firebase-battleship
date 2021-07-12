import { TestBed } from '@angular/core/testing';

import { WaitingForPlayerService } from './waiting-for-player.service';

describe('WaitingForPlayerService', () => {
  let service: WaitingForPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaitingForPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
