import { WebSocketService } from './services/webSocket/web-socket.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, concatMap, map, startWith, switchMap } from 'rxjs/operators';
import { FriendsService } from './services/friends/friends.service';
import { IFriends } from './models/friends.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  resultsLength = 0;
  isLoadingResults = true;
  data: Array<IFriends> = [];
  displayedColumns: string[] = ['id', 'name', 'gender'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private friendsService: FriendsService,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    this.listenSocketServer();
  }

  ngAfterViewInit(): void {
    this.getFriends();
  }

  getFriends(): void {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.friendsService!.getFriends().pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;

          if (data === null) {
            return [];
          }

          return data;
        }),
      )
      .subscribe(data => this.data = data);
  }

  listenSocketServer(): void {
    this.webSocketService.getMessage() 
    
    // here we want to listen to an event from the socket.io server
    // this.webSocketService.listen('message').subscribe((data) => {
    //   console.log('====================================');
    //   console.log('DATA', data);
    //   console.log('====================================');
    // })
  }

  sendMessage() {
    setTimeout(() => {
      this.webSocketService.sendMessage('Si funciona');
    }, 10000);
  }

  ngOnDestroy() {
    this.webSocketService.disconnect();
  }
}