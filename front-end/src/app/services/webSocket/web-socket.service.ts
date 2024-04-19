import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: any;
  readonly url: string = 'http://localhost:8000';

  constructor() {
    // this.socket = io(this.url);
  }

  listen(eventName: string): Observable<any> {
    this.socket = io(this.url);

    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next();
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}
