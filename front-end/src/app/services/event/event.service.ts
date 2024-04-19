import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  sse!: EventSource

  constructor() {}

  getEventData() {
    return new Observable(obs => {
      this.sse = new EventSource(`${environment.SERVER_EVENT}/events`);

      this.sse.onerror = (error) => {
        console.log(error);
      }

      this.sse.onmessage = (message) => {        
        obs.next(JSON.parse(message.data));
      }
    })
  }
}
