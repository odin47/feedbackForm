import { TestBed, inject } from '@angular/core/testing';

import { FeedbackDataServiceService } from './feedback-data-service.service';

describe('FeedbackDataServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedbackDataServiceService]
    });
  });

  it('should be created', inject([FeedbackDataServiceService], (service: FeedbackDataServiceService) => {
    expect(service).toBeTruthy();
  }));
});
