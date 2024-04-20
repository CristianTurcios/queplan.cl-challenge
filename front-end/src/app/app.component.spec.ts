import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ServerEventsService } from './services/server-events/server-events.service';
import { FriendsService } from './services/friends/friends.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { testUtils } from 'src/utils/test-utils';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let friendsService: jasmine.SpyObj<FriendsService>;
  let serverEventsService: jasmine.SpyObj<ServerEventsService>;

  beforeEach(waitForAsync(() => {
    friendsService = jasmine.createSpyObj('FriendsService', ['getFriends']);
    serverEventsService = jasmine.createSpyObj('ServerEventsService', [
      'connectToServerSentEvents',
      'close',
    ]);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        MatTableModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatPaginatorModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: FriendsService, useValue: friendsService },
        { provide: ServerEventsService, useValue: serverEventsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    serverEventsService.connectToServerSentEvents.and.returnValue(
      of({
        id: 1,
        name: 'Cristian',
        gender: 'male',
      })
    );
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call listenServerEvents()', () => {
      spyOn(component, 'listenServerEvents');
      component.ngOnInit();

      expect(component.listenServerEvents).toHaveBeenCalled();
    });
  });

  describe('ngAfterViewInit', () => {
    it('should call getFriends()', () => {
      spyOn(component, 'getFriends');
      component.ngAfterViewInit();

      expect(component.getFriends).toHaveBeenCalled();
    });
  });

  describe('listenServerEvents', () => {
    it('should call serverEventsService.connectToServerSentEvents', () => {
      spyOn(component, 'insertChanges');
      component.listenServerEvents();
      expect(
        serverEventsService.connectToServerSentEvents
      ).toHaveBeenCalledTimes(1);
    });

    it('should call insertChanges if index is in data', () => {
      component.data = [
        {
          id: 1,
          name: 'Cristian',
          gender: 'male',
        },
      ];
      spyOn(component, 'insertChanges');
      component.listenServerEvents();
      expect(serverEventsService.connectToServerSentEvents).toHaveBeenCalled();
      expect(component.insertChanges).toHaveBeenCalledTimes(1);
    });
  });

  describe('insertChanges', () => {
    it('should modify friend data', () => {
      const originalData = { id: 1, name: 'Cristian', gender: 'male' };
      component.data = [originalData];
      const eventData = { id: 1, name: 'Javier', gender: 'female' };
      component.insertChanges(eventData, 0);
      expect(component.data[0].updatedName).toEqual('Javier');
      expect(component.data[0].updatedGender).toEqual('female');
    });
  });

  describe('getFriends', () => {
    it('should call getFriends to retrieve api values', () => {
      friendsService.getFriends.and.returnValue(
        of({
          items: [{ id: 1, name: 'Javier', gender: 'male' }],
          meta: {
            totalItems: 12,
            itemCount: 10,
            itemsPerPage: 10,
            totalPages: 2,
            currentPage: 1,
          },
          links: {
            first: '/my-friends?limit=10',
            previous: '',
            next: '/my-friends?page=2&limit=10',
            last: '/my-friends?page=2&limit=10',
          },
        })
      );

      component.data = [];
      fixture.detectChanges();

      component.getFriends();
      expect(friendsService.getFriends).toHaveBeenCalled();
      expect(component.data[0].name).toEqual('Javier');
    });

    it('should handle error if getFriends fail and return empty values', () => {
      friendsService.getFriends.and.returnValue(
        throwError(() => new Error('error'))
      );

      component.data = [{ id: 1, name: 'Cristian', gender: 'male' }];
      fixture.detectChanges();

      component.getFriends();
      expect(friendsService.getFriends).toHaveBeenCalled();
      expect(component.data).toEqual([]);
    });
  });

  describe('View Test', () => {
    it('should render title', () => {
      const dataTestId = 'friends-title';
      const selectorString = testUtils.getTestIdSelectorString(dataTestId);
      const elements = fixture.debugElement.queryAll(By.css(selectorString));
      expect(elements.length).toBe(1);
    });
  });
});
