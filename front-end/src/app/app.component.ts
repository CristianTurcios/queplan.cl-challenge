import { EventService } from './services/event/event.service';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
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
    private cd: ChangeDetectorRef,
    private eventService: EventService,
    private friendsService: FriendsService,
  ) { }

  ngOnInit(): void {
    this.listenServerEvents();
  }

  ngAfterViewInit(): void {
    this.getFriends();
  }

  listenServerEvents() {
    this.eventService.getEventData().subscribe({
      next: (eventData: any) => {
        const newData = JSON.parse(eventData);
        console.log('value', newData);
        const index = this.data.findIndex((item) => newData.id === item.id);
        this.data[index] = eventData;
        this.cd.detectChanges();
      }
    });
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
}