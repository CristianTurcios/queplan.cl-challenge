import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFriends } from 'src/app/models/friends.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private _httpClient: HttpClient) { }

  getFriends(): Observable<Array<IFriends>> {
    const url = `${environment.API_URL}/my-friends`;
    return this._httpClient.get<Array<IFriends>>(url);
  }
}
