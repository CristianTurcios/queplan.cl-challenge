export class EventSourceMock {
  private listeners: any = [];

  // eslint-disable-next-line @typescript-eslint/ban-types
  addEventListener(eventName: string, cb: any) {
    this.listeners.push(cb);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onerror(error: any) {}

  // Helper method for emitting errors
  emitError(data: any) {
    this.onerror(data);
  }

  // Helper method for emitting events
  emit(data: any) {
    this.listeners.forEach((cb: any) => cb(data));
  }
}
