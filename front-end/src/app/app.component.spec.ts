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
import { of } from 'rxjs';

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
    beforeEach(() => {
      serverEventsService.connectToServerSentEvents.and.returnValue(
        of({
          id: 1,
          name: 'Cristian',
          gender: 'male',
        })
      );
    });

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

  describe('View Test', () => {
    it('should render title', () => {
      const dataTestId = 'friends-title';
      const selectorString = testUtils.getTestIdSelectorString(dataTestId);
      const elements = fixture.debugElement.queryAll(By.css(selectorString));
      expect(elements.length).toBe(1);
    });
  });
});
