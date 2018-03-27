// Extend the Window class with the Web Speech API -> SpeechRecognition engines
// for the different browser types
export interface IWindow extends Window {
  webkitSpeechRecognition: any;
  mozSpeechRecognition: any;
  msSpeechRecognition: any;
  SpeechRecognition: any;
}
