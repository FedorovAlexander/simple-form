import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { User, UserLoginResponse } from '../../models/user.interface';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return of(!!token);
  }

  login(
    username: string,
    password: string
  ): Observable<UserLoginResponse | null> {
    const url = 'https://dummyjson.com/auth/login';

    const body = {
      username,
      password,
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<UserLoginResponse>(url, body, { headers }).pipe(
      map((response) => {
        localStorage.setItem('token', response.token);
        this.userService.setUserToken(response.token);
        return response;
      }),
      catchError(() => of(null))
    );
  }

  getUser(): Observable<User | null> {
    const token = localStorage.getItem('token');
    const url = 'https://dummyjson.com/auth/me';

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.get<User>(url, { headers }).pipe(
      map((user) => {
        this.userService.setUser(user);
        return user;
      }),
      catchError(() => of(null))
    );
  }
}
