import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Friend } from 'src/app/models/friend';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  sse!: EventSource;

  getEventData(): Observable<Friend> {
    return new Observable(obs => {
      this.sse = new EventSource(`${environment.SERVER_EVENT}/events`);

      this.sse.onerror = error => {
        console.log(error);
      };

      this.sse.onmessage = message => {
        obs.next(JSON.parse(JSON.parse(message.data)));
      };
    });
  }
}
