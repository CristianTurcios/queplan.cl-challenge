import { Injectable, NgZone } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Friend } from 'src/app/models/friend';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServerEventsService {
  private eventSource!: EventSource;

  /**
   * constructor
   * @param zone - we need to use zone while working with server-sent events
   * because it's an asynchronous operations which are run outside of change detection scope
   * and we need to notify Angular about changes related to SSE events
   */
  constructor(private zone: NgZone) {}

  /**
   * Method for creation of the EventSource instance
   * @param url - SSE server api path
   */
  getEventSource(url: string): EventSource {
    return new EventSource(url);
  }

  /**
   * Method for establishing connection and subscribing to events from SSE
   * @param url - SSE server api path
   */
  connectToServerSentEvents(): Observable<Friend> {
    const url = `${environment.SERVER_EVENT}/sse`;
    this.eventSource = this.getEventSource(url);

    return new Observable((subscriber: Subscriber<Friend>) => {
      this.eventSource.onerror = error => {
        this.zone.run(() => subscriber.error(error));
      };

      this.eventSource.addEventListener('message', message => {
        this.zone.run(() =>
          subscriber.next(JSON.parse(JSON.parse(message.data)))
        );
      });
    });
  }

  /**
   * Method for closing the connection
   */
  close(): void {
    if (!this.eventSource) {
      return;
    }

    this.eventSource.close();
  }
}
