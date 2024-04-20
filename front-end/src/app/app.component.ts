import { EventService } from './services/event/event.service';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { FriendsService } from './services/friends/friends.service';
import { Friend } from './models/friend';
import { Columns } from './types/displayed-columns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  isLoadingResults = true;
  data: Array<Friend> = [];
  totalData = 0;
  displayedColumns: Set<Columns> = new Set(['id', 'name', 'gender']);
  pageSizes = [3, 5, 7];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private cd: ChangeDetectorRef,
    private eventService: EventService,
    private friendsService: FriendsService
  ) {}

  ngOnInit(): void {
    this.listenServerEvents();
  }

  ngAfterViewInit(): void {
    this.getFriends();
  }

  listenServerEvents() {
    this.eventService.getEventData().subscribe({
      next: (eventData: Friend) => {
        console.log('eventData', eventData);

        const index = this.data.findIndex(
          (item: Friend) => eventData.id === item.id
        );

        if (index > 0) {
          this.insertChanges(eventData, index);
        }
      },
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
          return this.friendsService
            ?.getFriends(this.paginator.pageIndex + 1, this.paginator.pageSize)
            .pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;

          if (data === null) {
            return { items: [], meta: {}, pagination: {} };
          }
          this.totalData = data.meta.totalItems;
          return data;
        })
      )
      .subscribe(data => (this.data = data.items));
  }

  insertChanges(eventData: Friend, index: number): void {
    this.displayedColumns.add('updatedName');
    this.displayedColumns.add('updatedGender');
    this.data[index].updatedName = eventData.name;
    this.data[index].updatedGender = eventData.gender;
    this.cd.detectChanges();
  }
}
