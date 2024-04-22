import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { ServerEventsService } from './services/server-events/server-events.service';
import { FriendsService } from './services/friends/friends.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogComponent } from './components/dialog/dialog.component';
import { FilterComponent } from './components/filter/filter.component';
import { TableComponent } from './components/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

class MatSnackBarStub {
  open() {
    return {
      onAction: () => of({}),
    };
  }
}

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
      declarations: [AppComponent, DialogComponent],
      imports: [
        MatPaginatorModule,
        MatDialogModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        FilterComponent,
        TableComponent,
        HeaderComponent,
        SpinnerComponent,
      ],
      providers: [
        { provide: MatSnackBar, useClass: MatSnackBarStub },
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
    beforeEach(() => {
      spyOn(component, 'showDialog');
      spyOn(component, 'showSnackBar');
    });

    it('should call serverEventsService.connectToServerSentEvents', () => {
      spyOn(component, 'updateData');
      component.listenServerEvents();
      expect(
        serverEventsService.connectToServerSentEvents
      ).toHaveBeenCalledTimes(1);
    });

    it('should call updateData if index is in data', () => {
      component.data = [
        {
          id: 1,
          name: 'Cristian',
          gender: 'male',
        },
      ];
      spyOn(component, 'updateData');
      component.listenServerEvents();
      expect(serverEventsService.connectToServerSentEvents).toHaveBeenCalled();
      expect(component.updateData).toHaveBeenCalledTimes(1);
    });

    it('should call showSnackBar() if sse has an error', () => {
      serverEventsService.connectToServerSentEvents.and.returnValue(
        throwError(() => new Error('error'))
      );
      component.listenServerEvents();
      expect(component.showSnackBar).toHaveBeenCalled();
    });
  });

  describe('updateData', () => {
    it('should modify friend data', () => {
      const originalData = { id: 1, name: 'Cristian', gender: 'male' };
      component.data = [originalData];
      const eventData = { id: 1, name: 'Javier', gender: 'female' };
      component.updateData(eventData, 0);
      expect(component.data[0].updatedName).toEqual('Javier');
      expect(component.data[0].updatedGender).toEqual('female');
    });
  });

  describe('getFriends', () => {
    beforeEach(() => {
      friendsService.getFriends.and.returnValue(
        of({
          data: [{ id: 1, name: 'Javier', gender: 'male' }],
          meta: {
            totalItems: 1,
            itemCount: 10,
            itemsPerPage: 10,
            totalPages: 1,
            currentPage: 1,
            sortBy: [['id', 'ASC']],
          },
          links: {
            current: '/my-friends?limit=10',
            next: '/my-friends?page=1&limit=10',
            last: '/my-friends?page=1&limit=10',
          },
        })
      );
    });

    it('should call getFriends to retrieve api values with default pagination values', () => {
      component.data = [];
      fixture.detectChanges();

      component.getFriends();
      expect(friendsService.getFriends).toHaveBeenCalledWith(1, 5, '');
      expect(component.data[0].name).toEqual('Javier');
    });

    it('should call getFriends with search param', () => {
      component.data = [];
      fixture.detectChanges();

      component.getFriends('Javier');
      expect(friendsService.getFriends).toHaveBeenCalledWith(1, 5, 'Javier');
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

  describe('filterData', () => {
    it('should call getFriends with search param', () => {
      component.data = [{ id: 1, name: 'name', gender: 'female' }];
      spyOn(component, 'getFriends');
      component.filterData('Cristian');
      expect(component.getFriends).toHaveBeenCalledWith('Cristian');
    });
  });

  describe('showSnackBar', () => {
    it('should call snackBar.open()', () => {
      spyOn(component.snackBar, 'open').and.callThrough();
      component.showSnackBar('message');
      expect(component.snackBar.open).toHaveBeenCalled();
    });
  });
});
