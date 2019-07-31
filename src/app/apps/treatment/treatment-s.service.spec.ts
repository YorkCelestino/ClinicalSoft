import { TestBed, inject } from '@angular/core/testing';

import { TreatmentSService } from './treatment-s.service';

describe('TreatmentSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreatmentSService]
    });
  });

  it('should be created', inject([TreatmentSService], (service: TreatmentSService) => {
    expect(service).toBeTruthy();
  }));
});
