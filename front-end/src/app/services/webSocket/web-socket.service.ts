import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable, map } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(private socket: Socket) {
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data: any) => {
      console.log('Message', data);
      return data.msg;
    }));
  }


  // listen(eventName: string): Observable<any> {
  //   this.socket = io(this.url);

  //   return new Observable((subscriber) => {
  //     this.socket.on(eventName, (data: any) => {
  //       subscriber.next();
  //     })
  //   })
  // }

  // emit(eventName: string, data: any) {
  //   this.socket.emit(eventName, data);
  // }

  disconnect(): void {
    this.socket.disconnect();
  }
}
