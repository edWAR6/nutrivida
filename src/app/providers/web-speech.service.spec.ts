import { TestBed, inject } from '@angular/core/testing';

import { WebSpeechService } from './web-speech.service';

describe('WebSpeechService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebSpeechService]
    });
  });

  it('should be created', inject([WebSpeechService], (service: WebSpeechService) => {
    expect(service).toBeTruthy();
  }));
});
