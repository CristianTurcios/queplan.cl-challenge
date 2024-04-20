import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SubscriptionLike, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { FriendsService } from './services/friends/friends.service';
import { Friend } from './models/friend';
import { Columns } from './types/displayed-columns';
import { ServerEventsService } from './services/server-events/server-events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  totalData = 0;
  pageSizes = [3, 5, 7, 10];
  isLoadingResults = true;
  data: Array<Friend> = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private readonly eventSourceSubscription!: SubscriptionLike;
  displayedColumns: Set<Columns> = new Set(['id', 'name', 'gender']);

  constructor(
    private cdr: ChangeDetectorRef,
    private serverEventsService: ServerEventsService,
    private friendsService: FriendsService
  ) {}

  ngOnInit(): void {
    this.listenServerEvents();
  }

  ngAfterViewInit(): void {
    this.getFriends();
    this.cdr.detectChanges();
  }

  listenServerEvents() {
    this.serverEventsService.connectToServerSentEvents().subscribe({
      next: (data: Friend) => {
        console.log('data', data);
        const index = this.data.findIndex((el: Friend) => data.id === el.id);

        if (index !== -1) {
          this.insertChanges(data, index);
        }
      },
    });
  }

  getFriends(): void {
    this.paginator.page
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
  }

  ngOnDestroy() {
    this.eventSourceSubscription?.unsubscribe();
    this.serverEventsService.close();
  }
}
