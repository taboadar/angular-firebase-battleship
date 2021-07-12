import { TestBed } from '@angular/core/testing';

import { MeshPreparationService } from './mesh-preparation.service';

describe('MeshPreparationService', () => {
  let service: MeshPreparationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeshPreparationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
