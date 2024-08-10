import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return of(!!token);
  }

  login(username: string, password: string): Observable<User> {
    const url = 'https://dummyjson.com/auth/login';

    const body = {
      username,
      password,
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<User>(url, body, { headers });
  }

  getUser(): Observable<User | null> {
    const token = localStorage.getItem('token');
    const url = 'https://dummyjson.com/auth/me';

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.get<User>(url, { headers });
  }
}
