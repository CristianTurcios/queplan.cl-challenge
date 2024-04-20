import { NgZone } from '@angular/core';
import { ServerEventsService } from './server-events.service';
import { EventSourceMock } from './event-source-mock';
import { Friend } from 'src/app/models/friend';

/**
 * Test suite for EventSourceService
 */
describe('EventSourceService', () => {
  let service: ServerEventsService;
  let zone, eventSourceMock: any;

  beforeEach(() => {
    eventSourceMock = new EventSourceMock();
    zone = {
      run: jasmine.createSpy('run').and.callFake(fn => fn()),
    };
    service = new ServerEventsService(zone as unknown as NgZone);
  });

  describe('getEventSource', () => {
    it('should return an eventSource instance', () => {
      const eventSource = service.getEventSource('http://localhost:8000/sse');
      expect(eventSource).toBeDefined();
    });
  });

  describe('connectToServerSentEvents', () => {
    it('should open connection and listen to events', (done: DoneFn) => {
      spyOn(service, 'getEventSource').and.returnValue(eventSourceMock);
      const mockedData = { name: 'Javier', gender: 'male', id: 1 };
      service.connectToServerSentEvents().subscribe({
        next: (data: Friend) => {
          expect(data).toEqual(mockedData);
          done();
        },
      });

      eventSourceMock.emit({
        data: JSON.stringify(JSON.stringify(mockedData)),
      });
    });

    it('should open connection and catch error when fails', (done: DoneFn) => {
      spyOn(service, 'getEventSource').and.returnValue(eventSourceMock);

      service.connectToServerSentEvents().subscribe({
        error: error => {
          expect(error.message).toBe('error');
          done();
        },
      });

      eventSourceMock.emitError(new Error('error'));
    });
  });

  describe('close', () => {
    it('should not call close() if eventSource is not defined', () => {
      spyOn(eventSourceMock, 'close');
      service.close();
      expect(eventSourceMock.close).not.toHaveBeenCalled();
    });
  });
});
