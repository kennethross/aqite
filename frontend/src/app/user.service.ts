import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './app.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public http: HttpClient) {}

  getUsers$() {
    return this.http.get<{ data: User[] }>(`${environment.backendApi}/user`).pipe(
      map(x => x.data)
    );
  }

  createUser$(data: Omit<User, 'id'>) {
    return this.http.post(`${environment.backendApi}/user`, data);
  }

  updateUser$(id: string, data: Pick<User, 'phone' | 'hobbies' | 'skillSets'>) {
    return this.http.patch(`${environment.backendApi}/user/${id}`, data);
  }

  removeUser$(id: string) {
    return this.http.delete(`${environment.backendApi}/user/${id}`);
  }
}
