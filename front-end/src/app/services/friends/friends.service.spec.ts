import { TestBed } from '@angular/core/testing';
import { FriendsService } from './friends.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

/**
 * Test suite for FriendsService
 */
describe('FriendsService', () => {
  let httpClient: HttpClient;
  let service: FriendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FriendsService, HttpClient],
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(FriendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make GET request with default query params', () => {
    const url = `${environment.API_URL}/my-friends?page=1&limit=10`;
    spyOn(httpClient, 'get').and.returnValue(of());
    service.getFriends();
    expect(httpClient.get).toHaveBeenCalledWith(url);
  });

  it('should make GET request with custom query params', () => {
    const page = 2;
    const limit = 5;

    const url = `${environment.API_URL}/my-friends?page=${page}&limit=${limit}`;
    spyOn(httpClient, 'get').and.returnValue(of());
    service.getFriends(page, limit);
    expect(httpClient.get).toHaveBeenCalledWith(url);
  });

  it('should make GET request with search params', () => {
    const page = 2;
    const limit = 5;
    const search = 'Cristian';

    const url = `${environment.API_URL}/my-friends?page=${page}&limit=${limit}&search=${search}`;
    spyOn(httpClient, 'get').and.returnValue(of());
    service.getFriends(page, limit, search);
    expect(httpClient.get).toHaveBeenCalledWith(url);
  });
});
