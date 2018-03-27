import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DialogflowService {
  private baseURL = 'https://api.dialogflow.com/v1/query?v=20150910';
  private token: string = environment.dialogflow;

  constructor(private http: HttpClient) { }

  public getResponse(query: string) {
    const data = {
      query : query,
      lang: 'es-419',
      sessionId: 'public'
    };
    return this.http.post(`${this.baseURL}`, data, {headers: this.getHeaders()});
  }

  public getHeaders() {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return headers;
  }
}
