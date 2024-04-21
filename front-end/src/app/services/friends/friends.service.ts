import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(private _httpClient: HttpClient) {}

  getFriends(
    pageNumber = 1,
    pageSize = 10,
    searchParam = ''
  ): Observable<ApiResponse> {
    const defaultUrl = `${environment.API_URL}/my-friends?page=${pageNumber}&limit=${pageSize}`;
    const url = searchParam
      ? `${defaultUrl}&search=${searchParam}`
      : defaultUrl;
    return this._httpClient.get<ApiResponse>(url);
  }
}
