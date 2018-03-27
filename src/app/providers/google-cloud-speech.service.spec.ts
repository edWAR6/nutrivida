import { TestBed, inject } from '@angular/core/testing';

import { GoogleCloudSpeechService } from './google-cloud-speech.service';

describe('GoogleCloudSpeechService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleCloudSpeechService]
    });
  });

  it('should be created', inject([GoogleCloudSpeechService], (service: GoogleCloudSpeechService) => {
    expect(service).toBeTruthy();
  }));
});
